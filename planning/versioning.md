# Salad Price Uncharmer's versioning system
## Pre-v1.0 versions
Pre-v1.0 versions of Salad Price Uncharmer will use versions starting on v0.0.

The version number format used will be `v0.x.x-x`.

The major version (v**0**.x.x-x) will stay at zero throughout the pre-RTM lifecycle to indicate that it's in-development. 
The minor version (v0.**x**.x-x) will indicate the current development milestone. 
The patch version (v0.x.**x**-x) will indicate the progress in that milestone, which increments with new features, bug fixes, and enhancements. 
The build version (v0.x.x-**x**) indicates the build of the patch version.

### Milestones
#### v0.0 (pre-alpha 1)
This is the milestone before any code is written. At this stage, I'm still planning and thinking about how the userscript should go.
#### v0.1 (pre-alpha 2)
I'm laying out the first lines of code here. While it'll be able to round prices up, it'll only support one condition, may not work on all prices, and will not have the best code.
#### v0.2 (alpha 1)
I'm now adding compatiblility with more prices, making sure that no prices are left behind.
#### v0.3 (alpha 2)
I'm now writing the code to round a price up based on multiple conditions.
#### ~~v0.4 (alpha 3)~~
~~I'm now replacing the prices with a skeleton (placeholder) until they are rounded up. This is so the unrounded prices doesn't reach the user, affecting their purchasing thoughts.~~

~~This milestone will also house the feature-complete alpha version of the userscript.~~

This userscript rounds prices up so fast that a skeleton is not needed, so this milestone has been cancelled.
#### v0.5-0.8 (beta 1-4)
This is the beta stage, where the userscript has all of its planned features implemented, but may have bugs or rough edges. The beta milestones aims to polish the userscript for release, adding the final touches. The higher the milestone, the more progress we've made in the beta stage.
#### v0.9 (release candidates)
These are the release candidate versions, which are versions that may become the final stable release. The final testing is done here, and if no major bugs or issues are found, then the tested release candidate will become the stable release.

## Release (v1.x versions)
v1.x versions of Salad Price Uncharmer will use the versioning `v1.x.x-x`. From now on, the versioning system will work similarly to semantic versioning.

The major version (v**1**.x.x-x) will stay at 1 to indicate its status as a v1.x version. 
The minor version (v1.**x**.x-x) will indicate new features, major code improvements, user-facing enhancements, and general major improvements.
The patch version (v1.x.**x**-x) will indicate bug fixes and minor tweaks, internal or external. 
The build version (v1.x.x-**x**) indicates the build of the patch version.