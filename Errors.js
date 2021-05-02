{
  fullName: ValidatorError: Please Enter Your Full Name
      at validate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1253:13)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1236:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1181:14)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\document.js:2517:18
      at processTicksAndRejections (internal/process/task_queues.js:75:11) {
    properties: {
      validator: [Function (anonymous)],
      message: 'Please Enter Your Full Name',
      type: 'required',
      path: 'fullName',
      value: ''
    },
    kind: 'required',
    path: 'fullName',
    value: '',
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  },
  email: ValidatorError: Please Enter An Email
      at validate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1253:13)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1236:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1181:14)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\document.js:2517:18
      at processTicksAndRejections (internal/process/task_queues.js:75:11) {
    properties: {
      validator: [Function (anonymous)],
      message: 'Please Enter An Email',
      type: 'required',
      path: 'email',
      value: ''
    },
    kind: 'required',
    path: 'email',
    value: '',
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  },
  username: ValidatorError: Please Enter A Username
      at validate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1253:13)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1236:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1181:14)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\document.js:2517:18
      at processTicksAndRejections (internal/process/task_queues.js:75:11) {
    properties: {
      validator: [Function (anonymous)],
      message: 'Please Enter A Username',
      type: 'required',
      path: 'username',
      value: ''
    },
    kind: 'required',
    path: 'username',
    value: '',
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  },
  password: ValidatorError: Path `password` is required.
      at validate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1253:13)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1236:7
      at Array.forEach (<anonymous>)
      at SchemaString.SchemaType.doValidate (C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\schematype.js:1181:14)
      at C:\Users\hp\Desktop\pfe\backend\node_modules\mongoose\lib\document.js:2517:18
      at processTicksAndRejections (internal/process/task_queues.js:75:11) {
    properties: {
      validator: [Function (anonymous)],
      message: 'Path `password` is required.',
      type: 'required',
      path: 'password',
      value: ''
    },
    kind: 'required',
    path: 'password',
    value: '',
    reason: undefined,
    [Symbol(mongoose:validatorError)]: true
  }
}