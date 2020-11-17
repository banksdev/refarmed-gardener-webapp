import os
import re
import random
import datetime

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
pathToServiceAccount = 'TODO'
cred = credentials.Certificate(pathToServiceAccount)
firebase_admin.initialize_app(cred)
db = firestore.client()


def setIsBad(cropId, isBad):
    doc_ref = db.collection('crops').document("crop_" + str(cropId))
    doc = doc_ref.get()
    if doc.exists:
        print("found a doc... Updating!")
        newVal = isBad
        doc_ref.update({
            u'isBad': newVal
        })
    else:
        print("unable to find crop!")

def create(cropId, isBad, layer):
    doc_ref = db.collection('crops').document("crop_" + str(cropId))
    print("Creating crop...")
    doc_ref.create({
        u'isBad': isBad,
        u'id': cropId,
        u'layer': layer
    })

cropTypes = ['basil', 'cabbage', 'broccoli']

def creat_history_entry(cropType):
    db.collection('history').document().set({
        u'date': datetime.datetime(2020, random.randint(1, 10), random.randint(1, 28)),
        u'level': random.randint(1, 5),
        u'cropType': cropTypes[cropType],
        u'neighborCropType': cropTypes[(cropType + 1) % 3]
    })


for i in range(0, 51):
    print("Creating history entry...")
    creat_history_entry(random.randint(0, 2))

for i in range(0,25):
    create(i, False, (i % 5) + 1)

