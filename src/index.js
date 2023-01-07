import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
  combineReducers
} from "redux";

const reducer = (state = { count: 1 }) => state;

const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    //  const start = state;
    console.log("old state", state, action);
    const newState = reducer(state, action);
    //const end = newState;
    console.log("new state", newState, action);
    //console.log(start + end);

    return newState;
  };
  return createStore(logReducer, initialState, enhancer);
};

//const reducer = (state)=> state;

const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = end - start;
    console.log(diff);

    return newState;
  };
  return createStore(monitoredReducer, initialState, enhancer);
};

const logMiddleware = (store) => (next) => (action) => {
  console.log("old state", store.getState(), action);
  next(action);
  console.log("new state", store.getState(), action);
};

const monitorMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;
  console.log(diff);
};
//const store = createStore(reducer,  compose(logEnhancer, monitorEnhancer))

//const store = createStore(reducer, applyMiddleware(logMiddleware))
const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, monitorMiddleware)
);
store.dispatch({ type: "hello" });

//const store = createStore(reducer,  monitorEnhancer)

//store.dispatch({type: "Hello"})

//const initialState = {
//  users: [
//    {id: 1, name: "Steve"},
//    {id: 2, name: "Eric"}
//  ],
//  tasks:[
//    {title: "File in the TPS reports"},
//    {title: "Order more energy drinks"}
//  ]
//}

//const ADD_USER = "ADD_USER";
//const ADD_TASK = "ADD_TASK";

//const addTask = (title) => ({ type: ADD_TASK, payload:  title });
//const addUser = (name) => ({ type: ADD_USER, payload:  name  });

//const userReducer = (users= initialState.users, action)=>{
//  if (action.type === ADD_USER) {
//return [...users, action.payload]
//}
//return users
//}

//const taskReducer = (tasks = initialState.tasks, action)=>{
//  if (action.type === ADD_TASK) {
//    return [...tasks, action.payload]
//  }
//  return tasks
//}

//const reducer = combineReducers({users: userReducer, tasks: taskReducer})

//const store = createStore(reducer);

//store.dispatch(addTask("Record the statistics"));
//store.dispatch(addUser("Marc"));

//console.log(store.getState());

//const initialState = { value: 0};

//const INCREMENT = "INCREMENT"
//const ADD = "ADD";

//const incrementAction = {type: INCREMENT};

//const increment = ()=>({type: INCREMENT}); //this is an action creator
//const add = (amount)=>({type: ADD, payload: amount}); //this is an action creator

//const reducer = (state = initialState, action) => {
//  if(action.type === INCREMENT){
//    return {value: state.value + 1}
//  }
//  if(action.type === ADD){
//    return {value: state.value + action.payload}
//  }
//}

//const store = createStore(reducer);

//const subscriber = ()=> console.log('SUBSCRIBER', store.getState())

//store.subscribe(subscriber);

//const actions = bindActionCreators({increment, add}, store.dispatch);

//const dispatchAdd = compose(store.dispatch, add)

//const [dispatchIncrement, dispatchAdd] = [increment,add].map((fn)=>compose(store.dispatch, fn))

//actions.add(1000);
//actions.increment();

//console.log(store.getState())

//store.dispatch(increment())
//store.dispatch(increment())
//store.dispatch(add(100))

//console.log(store.getState())

//const makeLouder = string => string.toUpperCase();
//const repeatThreeTimes = string => string.repeat(3);
//const embolden = string => string.bold();

//const makeLouderRepeatThreeTimesAndEmbolden = string => embolden(repeatThreeTimes(makeLouder(string)))
//const makeLouderRepeatThreeTimesAndEmbolden = compose(embolden, repeatThreeTimes, makeLouder)

//console.log(makeLouderRepeatThreeTimesAndEmbolden("hello"))
