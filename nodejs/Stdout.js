export default class Stdout {
    static clear() {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);  // move cursor to beginning of line
    
    }

    static write(string) {
        process.stdout.write(string); 
    }

    static cursorTo(index) {
        process.stdout.cursorTo(index); 
    }
}