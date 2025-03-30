import { api } from "./axiosConfig";

// basic details
export const fetchLists = async (name) => {
  return await api
    .get(`/list`)
    .then((responce) => {
      return responce;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchItems = async (listId) => {
  return await api
    .get(`/list/${listId}`)
    .then((responce) => {
      return responce;
    })
    .catch((error) => {
      throw error;
    });
};

export const createNewList = async (name, type) => {
  return await api
    .post(`/list/create`, { name, type })
    .then((responce) => {
      return responce;
    })
    .catch((error) => {
      throw error;
    });
};

export const addToList = async (listId, type, entityId) => {
  return await api
    .post(`/list/add`, { listId, type, entityId })
    .then((responce) => {
      return responce;
    })
    .catch((error) => {
      throw error;
    });
};

export const removeItemFromList = async (listId, entityId) => {
    return await api
      .put(`/list/${listId}`)
      .then((responce) => {
        return responce;
      })
      .catch((error) => {
        throw error;
      });
  };
  

export const deleteList = async (listId) => {
  return await api
    .delete(`/list/${listId}`)
    .then((responce) => {
      return responce;
    })
    .catch((error) => {
      throw error;
    });
};
