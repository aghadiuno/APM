# APM
APM Project Source Code

# Setting Up Firebase
To serve to the Firebase hosting, follow these steps:
1. Login to our Firebase account `firebase login`, [account details here](https://trello.com/apm65)
2. Enter ./firebase-serve/ `cd firebase-serve`
3. Initialize Firebase `firebase init`<br>
It will warn you: "You are initializing in an existing Firebase project directory"
4. Choose only 'hosting' (use space bar to select)
5. Public directory should be 'public' <br> 'Yes' configure as a single page app <br> 'No', don't overwrite `index.html`
6. Use `firebase deploy` to upload the files, if it gives you a login error:
Do `firebase use --add` , from the given list select 'apm-main', then try to deploy again.

# Folders
## build
Contains optimized build files. To create an optimized build,<br>
use `npm run build`

## firebase-serve
Put build files here to serve to the Firebase site<br>
[Deploying to Firebase](https://firebase.google.com/docs/hosting/deploying)<br>
use `firebase deploy`

## functions
Put cloud functions here to serve to Firebase Cloud Functions<br>
use `firebase deploy --only functions`<br>

## node-modules
Hold all dependencies. Add a dependency by,<br>
use `npm install <package-name> --save`<br>
Example: `npm install react-bootstrap --save`<br>

## src/res
Put all images, videos, and any other resources in this folder<br>
