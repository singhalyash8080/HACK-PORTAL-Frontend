$(document).ready(function () {
  $('.sidenav').sidenav();
});

var array = []

function skill() {

  for (let i = 1; i <= 9; i++) {

    if ($('#' + i.toString()).is(':checked')) {
      array.push('"' + $('#' + i.toString()).val() + '"')
    }

  }

  // console.log(('{"skills":[' + array + ']}'))
  // console.log(JSON.parse('{"yash":"singhal"}'))

  // var myHeaders = new Headers();
  // myHeaders.append("authtoken", "test");

  var raw = JSON.parse('{"skills":[' + array + ']}')

  console.log(raw)



  var myHeaders = new Headers();
  // myHeaders.append("authtoken", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjZmMyMzViZDYxMGZhY2FlYzVlYjBhZGU5NTg5ZGE5NTI4MmRlY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGFja3BvcnRhbC01M2VmZSIsImF1ZCI6ImhhY2twb3J0YWwtNTNlZmUiLCJhdXRoX3RpbWUiOjE1OTU4NTExODQsInVzZXJfaWQiOiJkQ21Cb2xUczg3WFpLaWx5N1ZNcEpsMEZuZGYxIiwic3ViIjoiZENtQm9sVHM4N1haS2lseTdWTXBKbDBGbmRmMSIsImlhdCI6MTU5NTg1MTE4OCwiZXhwIjoxNTk1ODU0Nzg4LCJlbWFpbCI6Inlhc2guc2luZ2hhbDIwMTlAdml0c3R1ZGVudC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ5YXNoLnNpbmdoYWwyMDE5QHZpdHN0dWRlbnQuYWMuaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.V0ZuJhZ-Q0Zs4ifv4fPcKNYjx3tzv-92qZetl8CPOzx1DD9AE6BUBiaUEITuPwYwX1D_V5m_jv0rC2YXSNqZGgCdGxlMxJb-RJ5so-2j0N4c97rwS9EV9-zL9IeOR7AZHLXfV7NR3afpkg_E-cqof9eZxUXTWEc7XEq3XbkoBy4fJl6gK-g9BQKpMuB9HTWgwHNc1c0OMX13hk8DgZkYT26gaQ3K2lYTI183nzw_PY_6CdA59A_4PWKtOgmRjSOttNUslTiQMWBJUbGlsQUs46Oi4qYKktFf_dfNlkGJTIrB6Nb_JTOLAIXJbrObfVRogVubJ7_rXMXsL_JDgFmchQ");
  // myHeaders.append('Access-Control-Allow-Origin','*')
  // myHeaders.append('Access-Control-Allow-Credentials','true')
  // myHeaders.append('Access-Control-Allow-Headers','Authorization')


  var requestOptions = {
    method: 'POST',
    headers: {"authtoken":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjZmMyMzViZDYxMGZhY2FlYzVlYjBhZGU5NTg5ZGE5NTI4MmRlY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaGFja3BvcnRhbC01M2VmZSIsImF1ZCI6ImhhY2twb3J0YWwtNTNlZmUiLCJhdXRoX3RpbWUiOjE1OTU4NTExODQsInVzZXJfaWQiOiJkQ21Cb2xUczg3WFpLaWx5N1ZNcEpsMEZuZGYxIiwic3ViIjoiZENtQm9sVHM4N1haS2lseTdWTXBKbDBGbmRmMSIsImlhdCI6MTU5NTg1MTE4OCwiZXhwIjoxNTk1ODU0Nzg4LCJlbWFpbCI6Inlhc2guc2luZ2hhbDIwMTlAdml0c3R1ZGVudC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ5YXNoLnNpbmdoYWwyMDE5QHZpdHN0dWRlbnQuYWMuaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.V0ZuJhZ-Q0Zs4ifv4fPcKNYjx3tzv-92qZetl8CPOzx1DD9AE6BUBiaUEITuPwYwX1D_V5m_jv0rC2YXSNqZGgCdGxlMxJb-RJ5so-2j0N4c97rwS9EV9-zL9IeOR7AZHLXfV7NR3afpkg_E-cqof9eZxUXTWEc7XEq3XbkoBy4fJl6gK-g9BQKpMuB9HTWgwHNc1c0OMX13hk8DgZkYT26gaQ3K2lYTI183nzw_PY_6CdA59A_4PWKtOgmRjSOttNUslTiQMWBJUbGlsQUs46Oi4qYKktFf_dfNlkGJTIrB6Nb_JTOLAIXJbrObfVRogVubJ7_rXMXsL_JDgFmchQ"},
    body: JSON.stringify(raw)
  };

  fetch("https://hackportal.azurewebsites.net/users/searchuserprofiles/1", requestOptions)
    .then(response => {response.json()
    console.log(response)})
    .then(result => {
      console.log('yes')
      console.log(result)
    })
    .catch(error => console.log('error', error));

  console.log('done')

  // console.log(raw)

  // // var raw ={
  // //   "skills" : ["ml","web dev"]
  // // }

  // // console.log(raw)


  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // await fetch("https://hackportal.azurewebsite.net/users/searchuserprofiles/1", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
    

}