import {writable} from 'svelte/store';

const conditions = writable([]);

const customConditions = {
  subscribe: conditions.subscribe,
  setConditions: conditionArray => {
    conditions.set(conditionArray);
  },
  addConditions: conditionData => {
    const newCondition = {
      ...conditionData
    };
    conditions.update(items => {
      return [newCondition, ...items];
    });
  },
  updateCondition: (id, conditionData) => {
    conditions.update(items => {
      const conditionIndex = items.findIndex(i => i.id === id);
      const updatedCondition = {...items[conditionIndex], ...conditionData};
      const updatedConditions = [...items];
      updatedConditions[conditionIndex] = updatedCondition;
      return updatedConditions;
    });
  },
  removeCondition: id => {
    conditions.update(items => {
      return items.filter(i => i.id !== id);
    });
  }
};

export default customConditions;
