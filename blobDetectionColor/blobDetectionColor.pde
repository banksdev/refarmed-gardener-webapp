/**
 
 Blob detection program for the course Locative Media at IT University of Copenhagen spring 2019. 
 
 Based on code from: https://github.com/CodingTrain/website/blob/master/Tutorials/Processing/11_video/sketch_11_10_BlobTracking_lifespan/sketch_11_10_BlobTracking_lifespan.pde
 
 // Daniel Shiffman
 // http://codingtra.in
 // http://patreon.com/codingtrain
 // Code for: https://youtu.be/o1Ob28sF0N8
 
  Edited by: Christian Sivertsen (main editor) & Victor Permild (secondary editor)
 
 **/

import processing.video.*;
import org.openkinect.processing.*;

Capture video;

int blobCounter = 0;

int maxLife = 50;

color trackColor; //Used for color tracking
float likenessThreshold = 72;
float distanceThreshold = 30;

ArrayList<Blob> blobs = new ArrayList<Blob>();

boolean showPoints;

void setup() {
  size(640, 480);

  setupCamera(); 

  trackColor = color(106, 16, 47);
}

void captureEvent(Capture video) {
  video.read();
}

void setupCamera() {
  String[] cameras = Capture.list();

  if (cameras == null) {
    println("Failed to retrieve the list of available cameras, will try the default...");
    // video = new Capture(this, 640, 480);
    video = new Capture(this, 320, 240);
  } 
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    printArray(cameras);

    // The camera can be initialized directly using an element
    // from the array returned by list():
    video = new Capture(this, cameras[0]);
    // Or, the settings can be defined based on the text in the list
    //video = new Capture(this, 640, 480, "USB2.0 HD UVC Webcam", 30);

    // Start capturing the images from the camera
    video.start();
  }
}

void keyPressed() {
  int increment = 3;
  
  if (key == 'a') {
    distanceThreshold+=increment;
  } else if (key == 'z') {
    distanceThreshold-=increment;
  }
  distanceThreshold = constrain(distanceThreshold, increment, 150);
  if (key == 's') {
    likenessThreshold+=increment;
  } else if (key == 'x') {
    likenessThreshold-=increment;
  }
  likenessThreshold = constrain(likenessThreshold, increment, 150);
  
  if(key == 'p'){
    showPoints = !showPoints;
  }
}

void draw() {
  video.loadPixels();
  image(video, 0, 0);
  
  trackColor();

  //Show the current threshold values
  textAlign(RIGHT);
  fill(0);
  textSize(24);
  text("Distance threshold: " + distanceThreshold, width-10, 25);
  text("Likeness threshold: " + likenessThreshold, width-10, 50);  
  text("Tracking color: " + red(trackColor) + " " + green(trackColor) + " " + blue(trackColor), width-10, 75);
}

//Used to calculate distances between points that have 2 dimensions
float distSq(float x1, float y1, float x2, float y2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
  return d;
}

//Used to calcuate distances between colors that have 3 dimensions
float distSq(float x1, float y1, float z1, float x2, float y2, float z2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
  return d;
}

void mousePressed() {

  setTrackColor();
}

void trackColor() {

  ArrayList<Blob> currentBlobs = new ArrayList<Blob>();
  // Begin loop to walk through every pixel
  for (int x = 0; x < video.width; x++ ) {
    for (int y = 0; y < video.height; y++ ) {
      int loc = x + y * video.width;
      // What is current color
      color currentColor = video.pixels[loc];
      float r1 = red(currentColor);
      float g1 = green(currentColor);
      float b1 = blue(currentColor);
      float r2 = red(trackColor);
      float g2 = green(trackColor);
      float b2 = blue(trackColor);

      float d = distSq(r1, g1, b1, r2, g2, b2); 

      if (d < likenessThreshold*likenessThreshold) {

        boolean found = false;
        for (Blob b : currentBlobs) {
          if (b.isNear(x, y)) {
            b.add(x, y);
            found = true;
            break;
          }
        }

        if (!found) {
          Blob b = new Blob(x, y);
          currentBlobs.add(b);
        }
      }
    }
  }

  for (int i = currentBlobs.size()-1; i >= 0; i--) {
    if (currentBlobs.get(i).size() < 500) {
      currentBlobs.remove(i);
    }
  }

  // There are no blobs!
  if (blobs.isEmpty() && currentBlobs.size() > 0) {
    println("Adding blobs!");
    for (Blob b : currentBlobs) {
      b.id = blobCounter;
      println("BLOB ID:" + b.id);
      blobs.add(b);
      blobCounter++;
    }
  } else if (blobs.size() <= currentBlobs.size()) {
    // Match whatever blobs you can match


    for (Blob b : blobs) {
      float recordD = 1000;
      Blob matched = null;
      for (Blob cb : currentBlobs) {
        PVector centerB = b.getCenter();
        PVector centerCB = cb.getCenter();         
        float d = PVector.dist(centerB, centerCB);
        if (d < recordD && !cb.taken) {
          recordD = d; 
          matched = cb;
        }
      }
      matched.taken = true;
      b.become(matched);
    }

    // Whatever is leftover make new blobs
    for (Blob b : currentBlobs) {
      if (!b.taken) {
        b.id = blobCounter;
        println("BLOB ID:" + b.id);
        blobs.add(b);
        blobCounter++;
      }
    }
  } else if (blobs.size() > currentBlobs.size()) {
    for (Blob b : blobs) {
      b.taken = false;
    }


    // Match whatever blobs you can match
    for (Blob cb : currentBlobs) {
      float recordD = 1000;
      Blob matched = null;
      for (Blob b : blobs) {
        PVector centerB = b.getCenter();
        PVector centerCB = cb.getCenter();         
        float d = PVector.dist(centerB, centerCB);
        if (d < recordD && !b.taken) {
          recordD = d; 
          matched = b;
        }
      }
      if (matched != null) {
        matched.taken = true;
        // Resetting the lifespan here is no longer necessary since setting `lifespan = maxLife;` in the become() method in Blob.pde
        // matched.lifespan = maxLife;
        matched.become(cb);
      }
    }

    for (int i = blobs.size() - 1; i >= 0; i--) {
      Blob b = blobs.get(i);
      if (!b.taken) {
        if (b.checkLife()) {
          blobs.remove(i);
        }
      }
    }
  }

  for (Blob b : blobs) {
    b.show();
  }
}

void setTrackColor() {
  // Save color where the mouse is clicked in trackColor variable
  int loc = mouseX + mouseY*video.width;
  trackColor = video.pixels[loc];
  println(red(trackColor), green(trackColor), blue(trackColor));
}