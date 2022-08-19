const addEl = document.getElementById("add_counter");
const resetEl = document.getElementById("reset");
const countersEl = document.getElementById("counters");

// action identifiers
const ADD_COUNTER = "add_counter";
const RESET = "reset";
const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const addCounter = (value) => {
  return {
    type: ADD_COUNTER,
    payload: value,
  };
};

const reset = (value) => {
  return {
    type: RESET,
    payload: value,
  };
};

const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

const decrement = (id, value) => {
  return {
    type: DECREMENT,
    payload: {
      id: id,
      value: value,
    },
  };
};

// initial state
const initialState = [
  {
    id: 1,
    value: 0,
  },
];

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === ADD_COUNTER) {
    return [...state, action.payload];
  } else if (action.type === RESET) {
    return state.map((counter) => {
      return {
        ...counter,
        value: 0,
      };
    });
  } else if (action.type === INCREMENT) {
    return state.map((counter) => {
      if (counter.id === action.payload.id) {
        return {
          ...counter,
          value: counter.value + action.payload.value,
        };
      }

      return {
        ...counter,
      };
    });
  } else if (action.type === DECREMENT) {
    return state.map((counter) => {
      if (counter.id === action.payload.id) {
        return {
          ...counter,
          value: counter.value - action.payload.value,
        };
      }

      return {
        ...counter,
      };
    });
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  let html = "";

  state.forEach((counter) => {
    html +=
      '<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">';
    html += '  <div class="text-2xl font-semibold">' + counter.value + "</div>";
    html += '    <div class="flex space-x-3">';
    html +=
      '      <button onclick="store.dispatch(increment(' +
      counter.id +
      ", " +
      counter.id +
      '))" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">Increment</button>';
    html +=
      '      <button onclick="store.dispatch(decrement(' +
      counter.id +
      ", " +
      counter.id +
      '))" class="bg-red-400 text-white px-3 py-2 rounded shadow">Decrement</button>';
    html += "    </div>";
    html += "</div>";
  });

  countersEl.innerHTML = html;
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
addEl.addEventListener("click", () => {
  store.dispatch(
    addCounter({
      id: store.getState().length + 1,
      value: 0,
    })
  );
});

resetEl.addEventListener("click", () => {
  store.dispatch(reset(initialState));
});
