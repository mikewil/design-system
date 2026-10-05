terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.0.1"
    }
  }
  required_version = ">= 1.0.4"
}

provider "azurerm" {
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
  client_id       = var.service_principal_client_id
  client_secret   = var.service_principal_client_secret
  features {}
}

# Step 2: Create a resource group (a container to hold your resources)
resource "azurerm_resource_group" "static_web_app_rg" {
  name     = "decot-rg-static-web-apps-con-sol-storybook"
  location = "Central US"
}

# Step 3: Create the Static Web App with environment variables
resource "azurerm_static_web_app" "static_web_app" {
  name                = "con-sol-storybook-static-web-app"
  resource_group_name = azurerm_resource_group.static_web_app_rg.name
  location            = azurerm_resource_group.static_web_app_rg.location

  sku_tier = "Standard"
  sku_size = "Standard"

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    AZURE_CLIENT_ID       = var.azure_client_id
    AZURE_CLIENT_SECRET   = var.azure_client_secret
  }
}
