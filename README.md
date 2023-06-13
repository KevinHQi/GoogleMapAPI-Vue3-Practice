# GoogleMapAPI Vue3 Practice
|      Desktop View      |       Mobile View      |
| ---------------------- | ---------------------- |
|![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/12.png)<br> | ![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/13.png)<br>|
## Introduction：
This is a front-end project that took half a week to complete. It utilizes the Vue 3 framework with Vuetify as the UI support and interacts with the Google Maps API to implement various functionalities. <br>
Two sets of layout designs were created for the desktop and mobile interfaces.<br>

Here is a deployed page you can check. (Notice: You will need a Google Map API key to make the page work properly.)<br>
[To My Deployment](https://haotian-google-map-project.pages.dev/)

## Installation:
1. Make sure you have Node.js and npm installed. <br>
2. Install yarn by typing command in terminal (consider run as administrator） :<br>
   ```npm install --global yarn```<br>
 3. Cd into folder "Accuenergy-PreInterview".<br>
 4. Enter command:<br>
  ```yarn install```<br>
  Then:<br>
  ```yarn dev```<br>
5. A local host address should appear in terminal, now you can open it in your web broswer.<br>

## User Guide
1. When accessing the web page, it will require you to input Google Maps API key:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/1.png)<br>
Copy and paste your key into it and click submit.<br>
(Notice that there is no validation on the key, please make sure you put in the correct key.To renter the API key,<br>
just refresh the page and do the process again.) <br>

2. After the web page launch, you can see a search bar on top left of the page:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/2.png)<br>
Input the place name you want to search and click on the magnifier icon(or press enter), the result should show on below:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/3.png)<br>
You can see name, address, local time and time zone, also a picture of the place.<br> 
On the right size, a marker at the location will appear on map:<br> 
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/4.png)<br>

3. You can get your current location by clicking the geo marker icon on the left. <br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/2.png)<br>
Be sure to give the page access to your location:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/5.png)<br>
Now you can see your location display:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/6.png)<br>

4. Everytime you search for a place, it will be added to a list on below, its ordered based on time without duplicates.<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/7.png)<br>
You can select any place by click on the checkbox on its left, then click delete to remove them from the list and map:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/8.png)<br>

5. To access history list on mobile layout, you can click on history button at the bottom:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/10.png)<br>
You can check the list and manage it the same way as above:<br>
![](https://github.com/KevinHQi/GoogleMapAPI-Vue3-Practice/blob/main/readmeAssets/11.png)<br>



