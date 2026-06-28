# PowerShell script to update dates, company name, and logo systematically across the project.
$projectDir = "D:\Saas\Center"

# 1. Get all HTML, XML, CSS, and JS files
$files = Get-ChildItem -Path $projectDir -Recurse -Include *.html, *.xml, *.css, *.js, *.txt

# Logo SVG code (gear icon style matching the logo image)
$gearSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>'

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Track if changes are made
    $changed = $false

    # Update Year 2024 to 2026
    if ($content -match "2024") {
        $content = $content -replace "2024", "2026"
        $changed = $true
    }

    # Update company name "الهندسية جروب" to "الهندسية للتوكيلات"
    if ($content -match "الهندسية جروب") {
        $content = $content -replace "الهندسية جروب", "الهندسية للتوكيلات"
        $changed = $true
    }

    # Update company name "الهندسية جروب" in Latin/English context if any
    if ($content -match "Engineering Group") {
        $content = $content -replace "Engineering Group", "Engineering Agencies"
        $changed = $true
    }

    # Replace logo icon letter "ه" with the new gear SVG icon
    # Case 1: <div class="navbar-logo-icon" aria-hidden="true">ه</div>
    if ($content -contains '<div class="navbar-logo-icon" aria-hidden="true">ه</div>') {
        $content = $content.Replace('<div class="navbar-logo-icon" aria-hidden="true">ه</div>', "<div class=`"navbar-logo-icon`" aria-hidden=`"true`">$gearSvg</div>")
        $changed = $true
    }
    # Case 2: <div class="navbar-logo-icon">ه</div>
    if ($content -contains '<div class="navbar-logo-icon">ه</div>') {
        $content = $content.Replace('<div class="navbar-logo-icon">ه</div>', "<div class=`"navbar-logo-icon`" aria-hidden=`"true`">$gearSvg</div>")
        $changed = $true
    }

    # Save file back if updated
    if ($changed) {
        # Force UTF8 encoding
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Update completed successfully!"
