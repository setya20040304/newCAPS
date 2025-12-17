<?php

require_once 'core/App.php';
require_once 'core/Controller.php';
require_once 'core/Database.php';
require_once 'config/config.php';

// Fungsi Helper untuk Vite Integration
function vite($entry) {
    $manifestPath = __DIR__ . '/../../public/build/.vite/manifest.json';
    $isDev = false;

    // Cek apakah server development Vite berjalan (cek port 5173)
    $handle = @fsockopen('localhost', 5173, $errno, $errstr, 0.1);
    if ($handle) {
        $isDev = true;
        fclose($handle);
    }

    if ($isDev) {
        // Mode Development: Load script langsung dari server Vite
        return '
            <script type="module" src="http://localhost:5173/@vite/client"></script>
            <script type="module" src="http://localhost:5173/resources/js/' . $entry . '"></script>
        ';
    } else {
        // Mode Production: Load file hasil build dari manifest.json
        if (!file_exists($manifestPath)) {
            return '';
        }
        
        $manifest = json_decode(file_get_contents($manifestPath), true);
        $entryKey = "resources/js/" . $entry;
        
        if (isset($manifest[$entryKey])) {
            $file = $manifest[$entryKey]['file'];
            $cssFiles = $manifest[$entryKey]['css'] ?? [];
            
            // Generate script tag untuk JS
            $html = '<script type="module" src="' . BASEURL . '/build/' . $file . '"></script>';
            
            // Generate link tag untuk CSS yang di-import oleh JS tersebut
            foreach ($cssFiles as $css) {
                $html .= '<link rel="stylesheet" href="' . BASEURL . '/build/' . $css . '">';
            }
            
            return $html;
        }
    }
}
