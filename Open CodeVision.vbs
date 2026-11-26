Option Explicit

Dim shell, fileSystem, folder, launcher
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")
folder = fileSystem.GetParentFolderName(WScript.ScriptFullName)
launcher = Chr(34) & folder & "\Start-CodeVision.ps1" & Chr(34)

' Start the local site without opening a terminal window.
shell.Run "powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File " & launcher, 0, False
