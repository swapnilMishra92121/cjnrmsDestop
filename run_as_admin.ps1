




# Check if running on Windows
# Check if running on Windows
Write-Host "Running on Windows"

# Define the commands to create and start the service
$scriptContent = @"
sc.exe create ".NET Service 0.1" binpath= "C:\Users\swapn\Downloads\qss\CJNDestop\backend\CJNCitationService\CJNParser.Worker.exe" start=auto
sc.exe start ".NET Service 0.1"
"@

# Path to a temporary script file
$tempScriptPath = "$env:TEMP\create_start_service.ps1"

# Write the commands to the temporary script file
$scriptContent | Out-File -FilePath $tempScriptPath -Encoding UTF8

# Run the temporary script as Administrator
Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File $tempScriptPath" -Verb RunAs -Wait

# Optionally clean up the temporary script after execution
Remove-Item $tempScriptPath
