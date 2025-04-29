<?php
// Conexión a la base de datos
$host = 'localhost';
$db = 'gp_base';
$user = 'root';
$pass = ''; // Cambia si tienes una contraseña

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Verificar si se recibió el id_tarea por GET
if (isset($_GET['id_tarea'])) {
    $id_tarea = $_GET['id_tarea'];

    // Preparar y ejecutar la consulta de eliminación
    $sql = "DELETE FROM tareas WHERE id_tarea = :id_tarea";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_tarea', $id_tarea, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo "Tarea eliminada correctamente.";
    } else {
        echo "Error al eliminar la tarea.";
    }
} else {
    echo "No se especificó ninguna tarea para eliminar.";
}
?>
