const axios=require('axios');
const pup=require('puppeteer');
const readline = require('readline').createInterface({
input: process. stdin,
output: process. stdout,
});
readline.question(`Enter the IMEI number: `, num => {
  getRequests(num);
  readline.close();
});
async function getRequests(IMEI){
  /*var at= await axios.get();
  var tmobile= await axios.get();
  var verizon= await axios.get();
  var blacklist= await axios.get();
  var iCloud= await axios.get();
  var listOfRequest=[
    ""
  ]
  await axios.all*/
  //353249103192023
  const browser = await pup.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
   });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  })
  var codes=["usbl","vzwfin","attfin","tmofin"];
  var dataArray=[];
  for(var i=0;i<2;i++){
  var names=["US Blacklist","Verizon Financial","AT&T financila","T-Mobile financial"];
  var dataObject={};
  var key=codes[i];
  dataObject.IMEI=IMEI;
  await page.goto('http://www.checkesnfree.com/index.html');
  await page.waitForSelector("#selectprovider > option:nth-child(1)");
  await page.$eval('#cesn', (el,IMEI)=> el.value = IMEI,IMEI);
  await page.$eval('#selectprovider', (el,key)=> el.value = key,key);
  await page.click("#submitButton");
  await page.waitForSelector("#cesnf_table > tbody > tr:nth-child(1) > td:nth-child(4) > font");
  var status=await page.$eval("#cesnf_table > tbody > tr:nth-child(1) > td:nth-child(4) > font",el=> el.textContent);
  var testName=await page.$eval("#cesnf_table > tbody > tr:nth-child(1) > td:nth-child(1)",el=> el.textContent);
  var model=await page.$eval("#cesnf_table > tbody > tr:nth-child(1) > td:nth-child(3)",el=> el.textContent);
  console.log(status);
  console.log(testName);
  console.log(model);
  dataObject[testName]=status;
  if(model.trim()!=""){
    dataObject.model=model;
  }
  console.log(dataObject);
  }
  await browser.close();

}
