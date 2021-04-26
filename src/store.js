import {writable} from 'svelte/store';

const store = writable({
  tableData: {
    status: 'loading',
    data: []
  }
});

export default store;
