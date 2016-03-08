let listeners = [];
let appState = {
  stats: {
    isLoad: false,
    isFetching: false,
    data: {

    }
  },
  labels: {
    isLoad: false,
    isFetching: false,
    data: []
  }
};

const endpoint = (...parts) => {
  let path = parts.join('/');
  return `${__BASE_ENDPOINT__}/${path}`;
};

const triggerChange = () => {
  listeners.forEach((listener) => {
    listener(appState);
  })
};

const updateAppState = (changes) => {
  appState = {
    ...appState,
    ...changes
  };

  triggerChange();
};

const getStats = () => {
  return appState.stats;
};

const fetchStats = (updateMeta = true) => {
  let stats = getStats();

  if (updateMeta) {
    updateAppState({
      stats: {
        ...stats,
        isLoad: false,
        isFetching: true
      }
    });
  }

  fetch(endpoint('stats')).then((response) => {
    return response.json();
  }).then((response) => {
    updateAppState({
      stats: {
        ...stats,
        data: response,
        isLoad: true,
        isFetching: false
      }
    });
  });
};

const getLabels= () => {
  return appState.labels;
};

const fetchLabels = () => {
  let labels = getLabels();

  updateAppState({
    labels: {
      ...labels,
      isLoad: false,
      isFetching: true
    }
  });

  fetch(endpoint('labels')).then((response) => {
    return response.json();
  }).then(({labels: response}) => {
    updateAppState({
      labels: {
        ...labels,
        data: response,
        isLoad: true,
        isFetching: false
      }
    });
  });
};


const train = (text, label) => {
  return fetch(endpoint('train'), {
    method: 'post',
    body: JSON.stringify({
      text,
      label
    })
  });
};


const classify = (text) => {
  return fetch(endpoint('classify'), {
    method: 'post',
    body: JSON.stringify({
      text
    })
  }).then(response => {
    return response.json()
  });
};


const fetchWords = (label) => {
  return fetch(
    endpoint('words', label)
  ).then(
    response => response.json()
  ).then(
    ({words}) => words
  );
};


export default {
  addListener(callback) {
    listeners = [...listeners, callback];
    return () => this.removeListener(callback);
  },

  removeListener(callback) {
    listeners = listeners.filter((listener) => listener !== callback)
  },

  fetchStats,
  getStats,
  fetchLabels,
  getLabels,
  fetchWords,

  train,
  classify,
  endpoint
};