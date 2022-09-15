import {ChangeDetectorRef, Component} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadFile} from "ng-zorro-antd/upload";
import {HttpClient} from "@angular/common/http";
import {ExportDemoService} from "./export-demo.service";
import {toNumber} from "ng-zorro-antd/core/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test_setting_restaurant';
  uploading = false;
  file: NzUploadFile;
  arrayBuffer: any;

  formattingChar = '/'
  location : {
    restaurantID
    locationManagerId
    restaurantName
    locationName
    locationLogo
    aboutUs
    restaurantType
    enable
    isFeatured
    contactNumber
    secondContactNumber
    email
    secondEmail
    alwaysOpened
    websiteUrl
    address
    city
    state
    country
    zip
    isDeliveryEnabled
    isTableReservationEnabled
    isOrderPickupEnabled
    printers
    currency
    priceTag
    cuisine
    locationTaxRate
    radius
    geolocation
    rating
    ratingCount
    advanceReservationDays
    weeklyHours: {
      monday: {
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      },
      tuesday: {
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
      wednesday:{
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
      thursday: {
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
      friday: {
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
      saturday:{
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
      sunday: {
        openTimeInMinutes,
        closeTimeInMinutes,
        enable: boolean,
      }
    },
    crossStreet
    parkingDetails
    publicTransit
    deliveryInfo
    minDeliveryAmount
  } = <any>{}
  menuList: {
    id
    location
    name
    enable
    description
    visibility
    type
  }[] = []
  products:{
    price:{
      type
      basePrice
    },
    name
    posName
    kitchenName
    description
    calories
    visibility
    enable
    groups
    image
    restaurantID
    location
    category
    categoryTitle
    menu
    modifierGroups
  }[] = []
  categories:{
    id
    restaurantID
    location
    menuID
    categoryName
    categoryDescription
    categoryImage
    enable
  }[] = []
  cuisines:{
    cuisineName
    cuisineImg
    cuisineImage
    enable
  }[] = []
  modifiers:{
    id
    name
    price
  }[] = []
  modifiersGroup:{
    id
    name
    description
    isRequired
    min
    max
    modifiers
    restaurantID
    locationID
  }[] = [];
  variants:{
    id
    price
    size
  }[] = [];

  constructor(private detector: ChangeDetectorRef,
              private service:ExportDemoService) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.file = file;
    this.detector.detectChanges()
    return false;
  };

  handleUpload(): void {
    try{
      this.location = <any>{}
      this.menuList = []
      this.products = []
      this.categories = []
      this.cuisines = []
      this.modifiersGroup = []
      this.variants = []

      import('xlsx').then(xlsx => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        reader.readAsBinaryString(<File><unknown>this.file);
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary'});
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);

            let data = initial[name]

            if (name.toLowerCase() == "location"){
              let day : {
                openTimeInMinutes,
                closeTimeInMinutes,
                enable: boolean,
              } = <any>{}
              let weeklyHours :  {
                monday:any,
                tuesday:any
                wednesday:any
                thursday:any
                friday:any
                saturday:any
                sunday:any
              } = <any>{}

              this.location.locationName = data[1]['__EMPTY'] != undefined ? data[1]['__EMPTY'].toString().trim() : ""
              this.location.restaurantType = data[2]['__EMPTY'] != undefined ? data[2]['__EMPTY'].toString().trim() : ""
              this.location.priceTag = data[3]['__EMPTY'] != undefined ? data[3]['__EMPTY'].toString().trim() : ""
              this.location.aboutUs = data[4]['__EMPTY'] != undefined ? data[4]['__EMPTY'].toString().trim() : ""
              this.location.contactNumber = data[5]['__EMPTY'] != undefined ? data[5]['__EMPTY'].toString().trim() : ""
              this.location.secondContactNumber = data[6]['__EMPTY'] != undefined ? data[6]['__EMPTY'].toString().trim() : ""
              this.location.address = data[7]['__EMPTY'] != undefined ? data[7]['__EMPTY'].toString().trim() : ""
              this.location.city = data[8]['__EMPTY'] != undefined ? data[8]['__EMPTY'].toString().trim() : ""
              this.location.country = data[9]['__EMPTY'] != undefined ? data[9]['__EMPTY'].toString().trim() : ""
              this.location.state = data[10]['__EMPTY'] != undefined ? data[10]['__EMPTY'].toString().trim() : ""
              this.location.zip = data[11]['__EMPTY'] != undefined ? data[11]['__EMPTY'].toString().trim() : ""
              this.location.email = data[12]['__EMPTY'] != undefined ? data[12]['__EMPTY'].toString().trim() : ""
              this.location.locationTaxRate = data[13]['__EMPTY'] != undefined ? data[13]['__EMPTY'].toString().trim() : ""
              this.location.restaurantID = ""

              let monday = day
              monday.openTimeInMinutes = data[17]['__EMPTY'] != undefined ? data[17]['__EMPTY'].toString().trim() : ""
              monday.closeTimeInMinutes = data[17]['__EMPTY_1'] != undefined ? data[17]['__EMPTY_1'].toString().trim() : ""
              monday.enable = data[17]['__EMPTY_2'] != undefined ? data[17]['__EMPTY_2'].toString().trim() : ""

              let tuesday = day
              tuesday.openTimeInMinutes = data[18]['__EMPTY'] != undefined ? data[18]['__EMPTY'].toString().trim() : ""
              tuesday.closeTimeInMinutes = data[18]['__EMPTY_1'] != undefined ? data[18]['__EMPTY_1'].toString().trim() : ""
              tuesday.enable = data[18]['__EMPTY_2'] != undefined ? data[18]['__EMPTY_2'].toString().trim() : ""

              let wednesday = day
              wednesday.openTimeInMinutes = data[19]['__EMPTY'] != undefined ? data[19]['__EMPTY'].toString().trim() : ""
              wednesday.closeTimeInMinutes = data[19]['__EMPTY_1'] != undefined ? data[19]['__EMPTY_1'].toString().trim() : ""
              wednesday.enable = data[19]['__EMPTY_2'] != undefined ? data[19]['__EMPTY_2'].toString().trim() : ""

              let thursday = day
              thursday.openTimeInMinutes = data[20]['__EMPTY'] != undefined ? data[20]['__EMPTY'].toString().trim() : ""
              thursday.closeTimeInMinutes = data[20]['__EMPTY_1'] != undefined ? data[20]['__EMPTY_1'].toString().trim() : ""
              thursday.enable = data[20]['__EMPTY_2'] != undefined ? data[20]['__EMPTY_2'].toString().trim() : ""

              let friday = day
              friday.openTimeInMinutes = data[21]['__EMPTY'] != undefined ? data[21]['__EMPTY'].toString().trim() : ""
              friday.closeTimeInMinutes = data[21]['__EMPTY_1'] != undefined ? data[21]['__EMPTY_1'].toString().trim() : ""
              friday.enable = data[21]['__EMPTY_2'] != undefined ? data[21]['__EMPTY_2'].toString().trim() : ""

              let saturday = day
              saturday.openTimeInMinutes = data[22]['__EMPTY'] != undefined ? data[22]['__EMPTY'].toString().trim() : ""
              saturday.closeTimeInMinutes = data[22]['__EMPTY_1'] != undefined ? data[22]['__EMPTY_1'].toString().trim() : ""
              saturday.enable = data[22]['__EMPTY_2'] != undefined ? data[22]['__EMPTY_2'].toString().trim() : ""

              let sunday = day
              sunday.openTimeInMinutes = data[23]['__EMPTY'] != undefined ? data[23]['__EMPTY'].toString().trim() : ""
              sunday.closeTimeInMinutes = data[23]['__EMPTY_1'] != undefined ? data[23]['__EMPTY_1'].toString().trim() : ""
              sunday.enable = data[23]['__EMPTY_2'] != undefined ? data[23]['__EMPTY_2'].toString().trim() : ""

              weeklyHours.monday=monday
              weeklyHours.tuesday=tuesday
              weeklyHours.wednesday=wednesday
              weeklyHours.thursday=thursday
              weeklyHours.friday=friday
              weeklyHours.saturday=saturday
              weeklyHours.sunday=sunday

              this.location.weeklyHours = weeklyHours
            }

            else if (name.toLowerCase() == 'modifiers group'){
              for (let i = 1; i < data.length; i++) {
                let modifierList = []
                if (data[i]['__EMPTY_1'] != undefined){
                  let modifiers :{
                    id
                    name
                    description
                    isRequired
                    min
                    max
                    modifiers:any[]
                    restaurantID
                    locationID
                  } = <any>{}
                  modifiers.modifiers = modifierList
                  let modifier :{
                    name
                    price
                  } = <any>{}
                  modifier.name = data[i]['Modifiers group'] != undefined ? data[i]['Modifiers group'].toString().trim() : ""
                  modifier.price = data[i]['__EMPTY'] != undefined ? toNumber(data[i]['__EMPTY'].toString().trim()) : 0
                  modifiers.name = data[i]['__EMPTY_1'] != undefined ? toNumber(data[i]['__EMPTY_1'].toString().trim()) : 1
                  modifiers.min = data[i]['__EMPTY_2'] != undefined ? toNumber(data[i]['__EMPTY_2'].toString().trim()) : 1
                  modifiers.max = data[i]['__EMPTY_3'] != undefined ? toNumber(data[i]['__EMPTY_3'].toString().trim()) : 1
                  modifiers.isRequired = data[i]['__EMPTY_4'] != undefined ? data[i]['__EMPTY_4'].toString().trim() : true
                  modifierList.push(modifier)
                  for (let j = i+1; j < data.length; j++) {
                    if (data[j]['__EMPTY_1'] === undefined){
                      let modifier :{
                        name
                        price
                      } = <any>{}
                      modifier.name = data[j]['Modifiers group'] != undefined ? data[j]['Modifiers group'].toString().trim() : ""
                      modifier.price = data[j]['__EMPTY'] != undefined ? data[j]['__EMPTY'].toString().trim() : 0
                      modifierList.push(modifier)
                    }else {
                      j = data.length+1
                    }
                  }
                  modifiers.modifiers = modifierList
                  this.modifiersGroup.push(modifiers)
                }
              }
            }

            else if (name.toLowerCase() == "menus"){
              for (let i = 1; i < data.length; i++) {
                let menu : {
                  id
                  location
                  name
                  enable
                  description
                  visibility
                  type
                } = <any>{}
                menu.location = ""
                menu.name = data[i]['Menus'] != undefined ? data[i]['Menus'].toString().trim() : ""
                menu.description = data[i]['__EMPTY'] != undefined ? data[i]['__EMPTY'].toString().trim() : ""
                this.menuList.push(menu)
              }

            }

            else if (name.toLowerCase() == "categories"){
              for (let i = 1; i < data.length; i++) {
                let category :{
                  id
                  restaurantID
                  location
                  menuID
                  categoryName
                  categoryDescription
                  categoryImage
                  enable
                } = <any>{}
                category.categoryName = data[i]['Categories'] != undefined ? data[i]['Categories'].toString().trim() : ""
                category.categoryDescription = data[i]['__EMPTY'] != undefined ? data[i]['__EMPTY'].toString().trim() : ""
                category.categoryImage = data[i]['__EMPTY_1'] != undefined ? data[i]['__EMPTY_1'].toString().trim() : ""
                category.menuID =  data[i]['__EMPTY_2'] != undefined ? data[i]['__EMPTY_2'].toString().trim() : ""
                this.categories.push(category)
              }
            }

            else if (name.toLowerCase() == "products"){
              for (let i = 1; i < data.length; i++) {
                let product :{
                  price:{
                    type
                    basePrice
                  },
                  name
                  posName
                  kitchenName
                  description
                  calories
                  visibility
                  enable
                  groups
                  image
                  restaurantID
                  location
                  category
                  categoryTitle
                  menu
                  modifierGroups
                } = <any>{}
                let price:{
                  type
                  basePrice
                } = <any>{}
                product.restaurantID = ''
                product.location = ''
                product.name = data[i]['Products'] != undefined ? data[i]['Products'].toString().trim() : ""
                price.type = "BASE_PRICE"
                price.basePrice = data[i]['__EMPTY'] != undefined ? Number.parseInt(data[i]['__EMPTY'].toString().trim()) : 0
                product.price = price
                product.image = data[i]['__EMPTY__1'] != undefined ? data[i]['__EMPTY__1'].toString().trim() : ""
                let modifier = data[i]['__EMPTY_2'] != undefined ? data[i]['__EMPTY_2'].toString().trim() : ""
                product.groups = modifier.toString() != "" ? modifier.toString().split(this.formattingChar) : []
                product.groups = product.groups !=[] ? product.groups.join(" "): ""
                product.modifierGroups = []
                product.category = data[i]['__EMPTY_3'] != undefined ? data[i]['__EMPTY_3'].toString().trim() : ""
                product.menu = data[i]['__EMPTY_4'] != undefined ? data[i]['__EMPTY_4'].toString().trim() : ""
                this.products.push(product)
              }
            }

            else if (name.toLowerCase() == "cuisines"){
              for (let i = 1; i < data.length; i++) {
                let cuisine : {
                  cuisineName
                  cuisineImg
                  cuisineImage
                  enable
                } = <any>{}
                cuisine.cuisineName = data[i]['Cuisines'] != undefined ? data[i]['Cuisines'].toString().trim() : ""
                cuisine.cuisineImage = data[i]['__EMPTY'] != undefined ? data[i]['__EMPTY'].toString().trim() : ""
                cuisine.enable = data[i]['__EMPTY_1'] != undefined ? data[i]['__EMPTY_1'].toString().trim() : ""
                this.cuisines.push(cuisine)
              }
            }
            return initial;
          }, {});
          this.formatData()
        };
      });

    }catch(e){
      console.log('error', e);
    }
  }

  setRestaurantSettingFromExcel(settings: any){
    let restaurantID = "603fcfef98cec8720c933f8c"
      this.service.setRestaurantSettingFromExcel(settings,restaurantID).subscribe(res=>{
        console.log(res)
      })
  }

  formatData(){
    let settings :  {
      location:any,
      products:any,
      categories:any,
      cuisines:any,
      menus:any
      modifiersGroup:any
    } = {
      location : this.location,
      products : this.products,
      categories : this.categories,
      cuisines : this.cuisines,
      menus : this.menuList,
      modifiersGroup:this.modifiersGroup,
    }
    this.setRestaurantSettingFromExcel(settings)
  }
}
