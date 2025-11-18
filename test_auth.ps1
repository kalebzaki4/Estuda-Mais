# Test script for authentication endpoints

Write-Host "Testing Authentication Endpoints..." -ForegroundColor Green

# Test Register Endpoint
Write-Host "`n1. Testing Register Endpoint..." -ForegroundColor Yellow
try {
    $registerBody = @{
        name = "Test User"
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
    Write-Host "Register Response: $($response | ConvertTo-Json -Depth 10)" -ForegroundColor Green
} catch {
    Write-Host "Register Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Error Response: $responseBody" -ForegroundColor Red
    }
}

# Test Login Endpoint
Write-Host "`n2. Testing Login Endpoint..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "Login Response: $($response | ConvertTo-Json -Depth 10)" -ForegroundColor Green
    
    # Store token for future requests
    $token = $response.token
    Write-Host "Token received: $token" -ForegroundColor Cyan
    
    # Test Get Current User Endpoint
    Write-Host "`n3. Testing Get Current User Endpoint..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        
        $userResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/me" -Method GET -Headers $headers
        Write-Host "Current User Response: $($userResponse | ConvertTo-Json -Depth 10)" -ForegroundColor Green
    } catch {
        Write-Host "Get Current User Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Test Logout Endpoint
    Write-Host "`n4. Testing Logout Endpoint..." -ForegroundColor Yellow
    try {
        $logoutResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/logout" -Method POST -Headers $headers
        Write-Host "Logout Response: $($logoutResponse | ConvertTo-Json -Depth 10)" -ForegroundColor Green
    } catch {
        Write-Host "Logout Error: $($_.Exception.Message)" -ForegroundColor Red
    }
    
} catch {
    Write-Host "Login Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Error Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host "`nAuthentication testing completed!" -ForegroundColor Green