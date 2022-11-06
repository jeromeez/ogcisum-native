const APIKEY = 'NQrs4GBt';
const URL = 'http://wmp.interaction.courses/api/v1/';

/**
 * This function will fetch the API data specifically the samples.
 * @param {String} data - The selected ID of data in date API
 */
export async function getSample() {
  // const response = await fetch(
  //   'http://wmp.interaction.courses/api/v1/?apiKey=' +
  //     APIKEY +
  //     '&mode=read&endpoint=samples',
  // );
  // const json = await response.json();
  // return json;

  let result;
  await fetch(
    'http://wmp.interaction.courses/api/v1/?apiKey=NQrs4GBt&mode=read&endpoint=samples',
  )
    .then(res => res.json())
    .then(res => {
      console.log('fe', res);
      result = res;
    })
    .catch(e => console.log(e));

  return result.samples.data_recording;
}
