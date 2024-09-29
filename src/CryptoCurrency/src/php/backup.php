<?php
// Налаштування бази даних
$host = 'localhost';
$db = 'project';
$user = 'root';
$pass = ''; // Замініть на ваш пароль

// Директорія для збереження резервних копій
$backupDir = 'D:/bd-backup/'; // Вкажіть шлях до директорії
if (!file_exists($backupDir)) {
    mkdir($backupDir, 0777, true);
}

// Формат імені файлу резервної копії
$date = date('YmdHis');
$backupFile = $backupDir . 'backup_' . $date . '.sql';

// Команда mysqldump
$command = "C:/xampp/mysql/bin/mysqldump --user=$user --password=$pass --host=$host $db > $backupFile";

// Виконання команди
system($command, $output);

if ($output === 0) {
    echo "Backup completed successfully!";
} else {
    echo "An error occurred during the backup.";
}

// Опціонально: видалення старих резервних копій (старіших за 30 днів)
$files = glob($backupDir . '*.sql');
$now = time();

foreach ($files as $file) {
    if (is_file($file)) {
        if ($now - filemtime($file) >= 30 * 24 * 60 * 60) { // 30 днів
            unlink($file);
        }
    }
}
?>
