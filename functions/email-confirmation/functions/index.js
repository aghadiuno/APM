/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


//Sends email to admin side when new user signs up
exports.adminNotificationHandler = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshotadmin = event.data;
  const valadmin = snapshotadmin.val();

  const mailOptions = {
    from: '"Appraisers Partner Management" <no-reply@apm.com>',
    to: 'ayushyamitabh@gmail.com'
  }
  if (!valadmin.approved) {
    mailOptions.subject = 'New Application : Appraiser';
    mailOptions.text = `New Appraiser Application\n${JSON.stringify(valadmin)}`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New application sent to', gmailEmail);
    });
  }

})

// Sends an email confirmation when user signs-up or when approval status changes
exports.approvalHandler = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();

  if (!snapshot.changed('approved')) {
    return;
  }

  const mailOptions = {
    from: '"Appraisers Partner Management" <no-reply@apm.com>',
    to: val.email
  };

  // The user just subscribed to our newsletter.
  if (!val.approved) {
    mailOptions.subject = 'Thank you for applying!';
    mailOptions.text = 'Thank you for applying to Appraisers Partner Management. We will be reviewing the information you submitted.\nWe will get back to you with our decision soon. Keep an eye on your emails, you can also check by going to www.test.ayushyamitabh.com and signing in as an appraiser.';
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New user sign-up confirmation sent to', val.email);
    });
  } else if (val.approved) {
    mailOptions.subject = 'Welcome to the APM family!';
    mailOptions.text = 'Thank you for applying to Appraisers Partner Management. After reviewing your application, we are happy to tell you that your appllication has been accepted. On behalf of the whole APM team, welcome to the family! \nYou can now sign-in by going to www.test.ayushyamitabh.com and signing in as an appraiser.';
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New user sign-up approved --', val.email);
    });
  }

});
