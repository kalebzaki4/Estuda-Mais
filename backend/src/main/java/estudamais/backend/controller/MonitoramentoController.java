package estudamais.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/monitoramento")
public class MonitoramentoController {

    private final Random random = new Random();

    @GetMapping("/uso-plataforma")
    public ResponseEntity<Map<String, Object>> getUsoPlataforma() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalUsuarios", 1000 + random.nextInt(100));
        data.put("usuariosAtivos", 200 + random.nextInt(50));
        data.put("novosCadastros", 10 + random.nextInt(5));
        return ResponseEntity.ok(data);
    }

    @GetMapping("/desempenho-backend")
    public ResponseEntity<Map<String, Object>> getDesempenhoBackend() {
        Map<String, Object> data = new HashMap<>();
        data.put("tempoRespostaMedio", 50 + random.nextInt(20));
        data.put("errosPorMinuto", random.nextInt(3));
        data.put("requisicoesPorMinuto", 100 + random.nextInt(50));
        return ResponseEntity.ok(data);
    }

    @GetMapping("/monitoramento-recursos")
    public ResponseEntity<Map<String, Object>> getMonitoramentoRecursos() {
        Map<String, Object> data = new HashMap<>();
        data.put("cpuUso", 30 + random.nextInt(20));
        data.put("memoriaUso", 40 + random.nextInt(15));
        data.put("discoUso", 60 + random.nextInt(10));
        return ResponseEntity.ok(data);
    }
}