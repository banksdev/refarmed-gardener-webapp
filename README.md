# ReFarmed Gardener Web App
This web app was created for the course Cross Disciplinary Team Work by group 33.
The app is created for the project partner ReFarmed, a vertical farming company.

## How to setup project
1. Create a firebase project web app with hosting
2. Generate service account `.json` file
3. Update `initializer.py` and provide `pathToServiceAccount`, then run it to initialize firestore database
4. Update the `.firebaserc` file with your project name  
5. Build the project: <br>
`$ yarn install` <br>
`$ yarn build`
5. Using the firebase CLI tools run: <br> 
`$ firebase login` <br> 
`$ firebase deploy`
