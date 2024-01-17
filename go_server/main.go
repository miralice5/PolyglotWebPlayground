// main.go (Go server)

package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
    "os"
    "os/exec"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "templates/index.html")
    })

    http.HandleFunc("/run_go", func(w http.ResponseWriter, r *http.Request) {
        var data map[string]interface{}
        body, _ := ioutil.ReadAll(r.Body)
        json.Unmarshal(body, &data)
        code := data["code"].(string)
        output, err := runGoCode(code)
        if err != nil {
            output = err.Error()
        }
        response := map[string]string{"output": output}
        responseJSON, _ := json.Marshal(response)
        w.Header().Set("Content-Type", "application/json")
        w.Write(responseJSON)
    })

    http.HandleFunc("/run_python", func(w http.ResponseWriter, r *http.Request) {
        var data map[string]interface{}
        body, _ := ioutil.ReadAll(r.Body)
        json.Unmarshal(body, &data)
        code := data["code"].(string)
        output, err := runPythonCode(code)
        if err != nil {
            output = err.Error()
        }
        response := map[string]string{"output": output}
        responseJSON, _ := json.Marshal(response)
        w.Header().Set("Content-Type", "application/json")
        w.Write(responseJSON)
    })

    http.HandleFunc("/run_typescript", func(w http.ResponseWriter, r *http.Request) {
        var data map[string]interface{}
        body, _ := ioutil.ReadAll(r.Body)
        json.Unmarshal(body, &data)
        code := data["code"].(string)
        output, err := runTypeScriptCode(code)
        if err != nil {
            output = err.Error()
        }
        response := map[string]string{"output": output}
        responseJSON, _ := json.Marshal(response)
        w.Header().Set("Content-Type", "application/json")
        w.Write(responseJSON)
    })

    http.ListenAndServe(":8080", nil)
}

func runGoCode(code string) (string, error) {
    filePath := "/tmp/go_code.go"
    err := ioutil.WriteFile(filePath, []byte(code), 0644)
    if err != nil {
        return "", err
    }
    defer os.Remove(filePath)

    cmd := exec.Command("go", "run", filePath)
    output, err := cmd.CombinedOutput()
    return string(output), err
}

func runPythonCode(code string) (string, error) {
    filePath := "/tmp/python_code.py"
    err := ioutil.WriteFile(filePath, []byte(code), 0644)
    if err != nil {
        return "", err
    }
    defer os.Remove(filePath)

    cmd := exec.Command("python", filePath)
    output, err := cmd.CombinedOutput()
    return string(output), err
}

func runTypeScriptCode(code string) (string, error) {
    filePath := "/tmp/ts_code.ts"
    err := ioutil.WriteFile(filePath, []byte(code), 0644)
    if err != nil {
        return "", err
    }
    defer os.Remove(filePath)

    cmd := exec.Command("tsc", filePath)
    output, err := cmd.CombinedOutput()
    if err != nil {
        return string(output), err
    }

    // Execute compiled JavaScript
    jsFilePath := "/tmp/ts_code.js"
    defer os.Remove(jsFilePath)
    cmd = exec.Command("node", jsFilePath)
    jsOutput, err := cmd.CombinedOutput()

    return string(jsOutput), err
}
