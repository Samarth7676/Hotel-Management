# Setup MySQL Database Script
# Run this from the root of the project

$DB_USER = "root"
$DB_PASS = "password"

# Read schema.sql and sample-data.sql
$SCHEMA = Get-Content -Path "database\schema.sql" -Raw
$DATA = Get-Content -Path "database\sample-data.sql" -Raw

# Execute MySQL commands
# Note: You must have the mysql client in your path for this to work
try {
    Write-Host "Creating database and tables..." -ForegroundColor Cyan
    echo "$SCHEMA" | mysql -u $DB_USER -p$DB_PASS
    
    Write-Host "Inserting sample data..." -ForegroundColor Cyan
    echo "$DATA" | mysql -u $DB_USER -p$DB_PASS
    
    Write-Host "Database setup completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error setting up database: $_" -ForegroundColor Red
}
