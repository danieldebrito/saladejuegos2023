import { Injectable, NgZone } from '@angular/core';
import { User } from 'src/app/class/User';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';


import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
'@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  public allUsers: User[] = [];


  constructor(
    public afs: Firestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.UpdateUserData(password, result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();

        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['home']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home']);

        this.SetUserData(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
  /*Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database */
  SetUserData(user: any) {
    const col = collection(this.afs, 'usuarios');
    const newDoc = doc(col);

    const userData: User = {
      uid: user.uid,
      id: newDoc.id,
      email: user.email,
      //password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    setDoc(newDoc, userData)
  }
  UpdateUserData(pass: string, user: any) {
    const col = collection(this.afs, 'usuarios');
    const allItems = collectionData(col);

    let userData: any = {};

    // take 1 parta que el orservable sea de un solo uso.
    allItems.pipe(take(1)).subscribe(res => {
      this.allUsers = res;
      console.log(this.allUsers);
      userData = this.allUsers.find(usr => usr.uid == user.uid);

      console.table(userData);
      console.log(user);

      const documento = doc(col, userData.id);
      userData = {
        uid: user.uid,
        //email: user.email,
        password: pass,
        //displayName: user.displayName,
        //photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      updateDoc(documento, userData);
    });
  }
}
