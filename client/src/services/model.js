class ModelService {
  requestModelResultAsync = async (action) => {
    let formData = new FormData();
    formData.append('fish', action.photo);

    // will have to modify to fit env, currently assuming localhost
    return await fetch('http://localhost:8080/predict', {
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
