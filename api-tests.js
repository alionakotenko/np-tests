let assert = require('chai').assert;
var request = require("request");

const baseUrl = 'https://api.novaposhta.ua/v2.0/';
const apiKey = 'b51551abacd076117bcb8b13dbb96110';

describe('getWarehouses', function() {
    it('POST request with the valid parameters (json)', async () => {
        var options = { 
          method: 'POST',
          url: baseUrl + 'json/',
          body: 
          { 
            modelName: 'AddressGeneral',
            calledMethod: 'getWarehouses',
            methodProperties: 
            { 
              Language: 'ru', 
              CityName: 'Суми' 
            },
            apiKey: apiKey 
          },
          json: true 
        };
      
      request(options, function (error, response, body) {    
        assert.isTrue(body.success);
      });
    });

    it('POST request with the empty API key', async () => {
      var options = { 
        method: 'POST',
        url: baseUrl + 'json/',
        body: 
        { 
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: 
          { 
            Language: 'ru', 
            CityName: 'Суми' 
          },
          apiKey: '' 
        },
        json: true 
      };
    
    request(options, function (error, response, body) {    
      assert.isTrue(body.success);
    });
  });

  it('POST request with the “CityName” parameter filled with numbers', async () => {
    var options = { 
      method: 'POST',
      url: baseUrl + 'json/',
      body: 
      { 
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: 
        { 
          Language: 'ru', 
          CityName: 'Sumy123' 
        },
        apiKey: apiKey 
      },
      json: true 
    };
  
    request(options, function (error, response, body) {
      assert.isTrue(body.success);
      assert.isEmpty(body.data);
    });
  });

  it('POST request with the “CityName” parameter containing more than 36 characters', async () => {
    var options = { 
      method: 'POST',
      url: baseUrl + 'json/',
      body: 
      { 
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: 
        { 
          Language: 'ru', 
          CityName: 'SumySumySumySumySumySumySumySumySumySumySumySumySumy' 
        },
        apiKey: apiKey 
      },
      json: true 
    };
  
    request(options, function (error, response, body) {
      assert.isTrue(body.success);
      assert.isEmpty(body.data);
    });
  });

  it('DELETE request with the valid parameters', async () => {
    var options = { 
      method: 'DELETE',
      url: baseUrl + 'json/',
      body: 
      { 
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: 
        { 
          Language: 'ru', 
          CityName: 'Суми' 
        },
        apiKey: apiKey 
      },
      json: true 
    };
    
    request(options, function (error, response, body) {    
      assert.isTrue(body.success);
    });
  });
});

describe('Waybill creation', function() {
  it('POST request with the invalid parameters (json)', async () => {
      var options = { 
        method: 'POST',
        url: baseUrl + 'json/',
        body: 
        { 
          modelName: "InternetDocument",
          calledMethod: "save",
          methodProperties: 
          {
            PayerType: "Sender",
            PaymentMethod: "Cash",
            DateTime: "02.03.2015",
            CargoType: "Cargo",
            VolumeGeneral: "0.1",
            Weight: "10",
            ServiceType: "WarehouseDoors",
            SeatsAmount: "1",
            Description: "абажур",
            Cost: "500",
            CitySender: "8d5a980d-391c-11dd-90d9-001a92567626",
            Sender: "6e9acced-d072-11e3-95eb-0050568046cd",
            SenderAddress: "01ae2635-e1c2-11e3-8c4a-0050568002cf",
            ContactSender: "d0b9f592-b600-11e4-a77a-005056887b8d",
            SendersPhone: "380678734567",
            CityRecipient: "db5c8892-391c-11dd-90d9-001a92567626",
            Recipient: "d00f2319-b743-11e4-a77a-005056887b8d",
            RecipientAddress: "511fcfbd-e1c2-11e3-8c4a-0050568002cf",
            ContactRecipient: "bc7b61ea-b6eb-11e4-a77a-005056887b8d",
            RecipientsPhone: "380631112223"
          },
          apiKey: apiKey 
        },
        json: true 
      };
    
    request(options, function (error, response, body) {
      assert.isFalse(body.success);
    });
  });

  it('POST request with the parameter "CargoType": "Documents" and “Weight”: “2”', async () => {
    var options = { 
      method: 'POST',
      url: baseUrl + 'json/',
      body: 
      { 
        modelName: "InternetDocument",
        calledMethod: "save",
        methodProperties: 
        {
          PayerType: "Sender",
          PaymentMethod: "Cash",
          DateTime: "02.03.2015",
          CargoType: "Documents",
          VolumeGeneral: "0.1",
          Weight: "2",
          ServiceType: "WarehouseDoors",
          SeatsAmount: "1",
          Description: "doc",
          Cost: "500",
          CitySender: "8d5a980d-391c-11dd-90d9-001a92567626",
          Sender: "6e9acced-d072-11e3-95eb-0050568046cd",
          SenderAddress: "01ae2635-e1c2-11e3-8c4a-0050568002cf",
          ContactSender: "d0b9f592-b600-11e4-a77a-005056887b8d",
          SendersPhone: "380678734567",
          CityRecipient: "db5c8892-391c-11dd-90d9-001a92567626",
          Recipient: "d00f2319-b743-11e4-a77a-005056887b8d",
          RecipientAddress: "511fcfbd-e1c2-11e3-8c4a-0050568002cf",
          ContactRecipient: "bc7b61ea-b6eb-11e4-a77a-005056887b8d",
          RecipientsPhone: "380631112223"
        },
        apiKey: apiKey 
      },
      json: true 
    };
  
    request(options, function (error, response, body) {
      assert.isFalse(body.success);
    });
  });

  it('POST request with the parameter "PayerType": "ThirdPerson" and “PaymentMethod”:”Cash”', async () => {
    var options = { 
      method: 'POST',
      url: baseUrl + 'json/',
      body: 
      { 
        modelName: "InternetDocument",
        calledMethod: "save",
        methodProperties: 
        {
          PayerType: "ThirdPerson",
          PaymentMethod: "Cash",
          DateTime: "02.03.2015",
          CargoType: "Documents",
          VolumeGeneral: "0.1",
          Weight: "0.1",
          ServiceType: "WarehouseDoors",
          SeatsAmount: "1",
          Description: "doc",
          Cost: "500",
          CitySender: "8d5a980d-391c-11dd-90d9-001a92567626",
          Sender: "6e9acced-d072-11e3-95eb-0050568046cd",
          SenderAddress: "01ae2635-e1c2-11e3-8c4a-0050568002cf",
          ContactSender: "d0b9f592-b600-11e4-a77a-005056887b8d",
          SendersPhone: "380678734567",
          CityRecipient: "db5c8892-391c-11dd-90d9-001a92567626",
          Recipient: "d00f2319-b743-11e4-a77a-005056887b8d",
          RecipientAddress: "511fcfbd-e1c2-11e3-8c4a-0050568002cf",
          ContactRecipient: "bc7b61ea-b6eb-11e4-a77a-005056887b8d",
          RecipientsPhone: "380631112223"
        },
        apiKey: apiKey 
      },
      json: true 
    };
  
    request(options, function (error, response, body) {
      assert.isFalse(body.success);
    });
  });
});