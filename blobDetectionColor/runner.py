import os
import re
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('refarmed-group33-78668bc3a03e.json') # TODO: Update
firebase_admin.initialize_app(cred)
db = firestore.client()


def setIsBad(cropId, isBad):
    doc_ref = db.collection('crops').document("crop_" + str(cropId))
    doc = doc_ref.get()
    if doc.exists:
        print("found a doc... Updating!")
        newVal = random.choice([True, False])
        doc_ref.update({
            u'isBad': newVal
        })
    else:
        print("unable to find crop!")


command = "processing-java --sketch=/Users/alexanderbanks/dev/blobDetectionColor --run" # TODO: Update
print("Starting Processing script....")
stream = os.popen(command)
prog = re.compile(r"BLOB ID:\d+")

l = stream.readline()
while l:
    res = prog.match(l)
    if res:
        blobid = int(l.split(":")[1])
        setIsBad(blobid, True)
        break

    l = stream.readline()


