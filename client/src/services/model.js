class ModelService {
  requestModelResultAsync = (action) => {
    let formData = new FormData();
    formData.append('fish', {
      uri: action.photo,
      name: 'fish',
    });

    // will have to modify to fit env, currently assuming localhost
    return fetch('http://10.0.0.50:8080/predict', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error in receiving data from api for predict');
      })
      .catch((e) => {
        return { error: e };
      });
  };
}

export default new ModelService();
