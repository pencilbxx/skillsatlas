param(
  [Parameter(Mandatory = $true)][string]$Deck,
  [string]$Out = ".tmp/deck-qa",
  [int]$Width = 1920,
  [int]$Height = 1080
)

$ErrorActionPreference = "Stop"

$deckPath = (Resolve-Path $Deck).Path
$outPath = if ([System.IO.Path]::IsPathRooted($Out)) { $Out } else { Join-Path (Get-Location) $Out }

if (Test-Path $outPath) { Remove-Item $outPath -Recurse -Force }
New-Item -ItemType Directory -Path $outPath -Force | Out-Null

$pp = New-Object -ComObject PowerPoint.Application
try {
  $pres = $pp.Presentations.Open($deckPath, $true, $false, $false)
  try {
    foreach ($slide in $pres.Slides) {
      $n = "{0:d2}" -f $slide.SlideIndex
      $slide.Export((Join-Path $outPath "slide-$n.png"), "PNG", $Width, $Height)
    }
  }
  finally { $pres.Close() }
}
finally {
  $pp.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pp) | Out-Null
}

Write-Output "Exported $((Get-ChildItem $outPath).Count) slides to $outPath"
