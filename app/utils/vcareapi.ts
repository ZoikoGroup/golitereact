const VCR_API_BASE = "https://www.vcareapi.com:8080";
const VCR_AGENT_ID = "ewebsiteapi";
const VCR_VENDOR_ID = "GoLiteMobileIncClient";
const VCR_USERNAME = "GoLiteMobileIncClient25qyUser";
const VCR_PASSWORD = "GoLiteMocfb7wa39q53f";
const VCR_PIN = "199454777745";

export async function checkDeviceCompatibility(imei: string) {
  try {

    // Step 1: Authenticate to get token
    const authUrl = "https://www.vcareapi.com:8080/authenticate";
    const authBody = {
      vendor_id: VCR_VENDOR_ID,
      username: VCR_USERNAME,
      password: VCR_PASSWORD,
      pin: VCR_PIN
    };

    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authBody)
    });

    if (!authResponse.ok) {
      throw new Error(`Authentication failed: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json();
    
    if (!authData.token) {
      throw new Error('Token not found in response');
    }

    const token = authData.token;

    // Step 2: Call inventory API with token
    const inventoryUrl = VCR_API_BASE + "/inventory";
    const inventoryBody = {
      action: "get_query_device",
      carrier: "BLUECONNECTSATT",
      source: "WEBSITE",
      agent_id: VCR_AGENT_ID,
      imei: imei
    };

    const inventoryResponse = await fetch(inventoryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(inventoryBody)
    });

    if (!inventoryResponse.ok) {
      throw new Error(`Inventory API failed: ${inventoryResponse.statusText}`);
    }

    const result = await inventoryResponse.json();

    // Return success response
    return {
      success: true,
      data: result
    };

  } catch (error) {
    // Return error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      message: errorMessage
    };
  }
};

// Usage example:
const handleCheckDevice = async () => {
  const model = "YOUR_IMEI_HERE";
  const response = await checkDeviceCompatibility(model);
  
  if (response.success) {
    console.log('Device data:', response.data);
  } else {
    console.error('Error:', response.message);
  }
};