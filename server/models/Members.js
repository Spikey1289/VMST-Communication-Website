///////////////////////////////////////////////////////////////////////////////
//                             USMS Members Model                            //
///////////////////////////////////////////////////////////////////////////////

/*
 * This model contains USMS membership information about all LMSC members. It must
 * be updated by CSV upload by the Membership Coordinator. The USMS number
 * serves as the unique identifier.
 */

const { Schema, model } = require('mongoose');

const memberSchema = new Schema(
  {
    // this is the number that changes every year and is unique (even if member listed twice)
    usmsRegNo: {type: String, required: true, unique: true, index: true,},
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    gender: { type: String, required: true, },
    club: { type: String, required: true, },
    workoutGroup: String,
    regYear: { type: Number, required: true },
    emails: {
      type: [String],
      match: [/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match an email address!'],
    },
    // did member opt out of receiving LMSC emails?
    emailExclude: { type: Boolean, default: false, },
  },
  {
    virtuals: {
      usmsId: {
        // permanent ID is last five characters of registration number
        // (might not be unique if member's registration years overlap)
        get() { return this.usmsRegNo.slice(-5); },
      },
      fullName: {
        get() { return `${this.firstName} ${this.lastName}`; },
      },
    },
    toJSON: { virtuals: true },  // access virtuals
    id: false,  // usmsRegNo is already unique identifier
  }
);

const Member = model('member', memberSchema);
module.exports = Member;
