///////////////////////////////////////////////////////////////////////////////
//                             USMS Members Model                            //
///////////////////////////////////////////////////////////////////////////////

/*
 * This model contains USMS membership information about all LMSC members. It must
 * be updated by CSV upload by the Membership Coordinator. The USMS number
 * serves as the unique identifier.
 */

const { Schema, model } = require('mongoose');

// TODO: use bcrypt to hash email addresses in the DB (not sure if this is needed)
// See module 21 activity 26 and documentation for mongoose and bcrypt

const memberSchema = new Schema(
  {
    usmsRegNo: {
      // this is the number that changes every year
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    workoutGroup: {
      type: String,
    },
    emails: {
      type: [String],
      // set up email regex validator
      match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!'],
    },
    // did member opt out of receiving LMSC emails?
    emailExclude: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },  // access virtuals
    id: false,  // usmsRegNo is already unique identifier
  }
);

/* VIRTUALS */
// extract last 5 characters of registration number to get permanent ID
memberSchema.virtual('usmsId').get(function() {
  return this.usmsRegNo.slice(-5);
});

const Member = model('member', memberSchema);
module.exports = Member;
