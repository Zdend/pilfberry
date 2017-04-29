TODO
------------
- Currently there is no way how to check types for Immutable records, there might be support in the future
- Write tests for API at least
DONE - Map relationships between entities
- Do not make the same request twice - if you have visited some route which fetched some entities, do not fetch them 
again when you transition to another path and back
- PureRenderMixin/Component
- Test in IE9, maybe polyfills are required (FormData - Axios, Promise)
- Setup production config - redux logger shouldn't log at all
DONE - Where to store page specific states? And should we keep our entities in store separate to the UI state? 
Let's say "loading" flag for fetching Objectives - should that be part of the entity itself or separate?
- Include date pickers
- Is UI recalculated when passing a query function with different objects? And is it only recalculated for components with that query? Can we optimise?


Decide
------------
NESTED - Should localisation files be in a flat structure (easier to compare) or nested (less duplications, 
but the structure is harder to understand) 
IMMUTABLE - Should we be passing plain objects (easier to manipulate and validate types) into our components 
or immutable (access to getters defined on records, prevents devs to manipulate with state) is fine?
- Should we use animations? For example on form open should we display it straight away or offer some transition
DONE - MAPS - Consider using Maps instead of List for records