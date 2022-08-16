import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
import * as firebase from "https://cdn.skypack.dev/firebase@9.9.0/app";
import "https://cdn.skypack.dev/firebase@9.9.0/auth";
import { assert } from "https://deno.land/std@0.147.0/testing/asserts.ts";

installGlobals();

const configString = Deno.env.get("FIREBASE_CONFIG");
assert(configString);
const firebaseConfig = JSON.parse(configString);
const firebaseApp = firebase.initializeApp(firebaseConfig);
