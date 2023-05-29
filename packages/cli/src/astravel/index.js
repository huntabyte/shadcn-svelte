// Astravel is  tiny and fast ESTree-compliant AST walker and modifier.
//
// Astravel was written by David Bonnet and released under an MIT license.
//
// The Git repository for Astravel is available at:
// https://github.com/davidbonnet/astravel.git
//
// Please use the GitHub bug tracker to report issues:
// https://github.com/davidbonnet/astravel/issues

import { defaultTraveler } from './defaultTraveler'
export { attachComments } from './attachComments'

export function makeTraveler(properties) {
  /*
  Returns a custom AST traveler that inherits from the `defaultTraveler` with its own provided `properties` and the property `super` that points to the parent traveler object.
  */
  return defaultTraveler.makeChild(properties)
}

export { defaultTraveler }
