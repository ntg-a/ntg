import { createInterface } from 'readline';
const tab = 4;
const history = 100;
const line = (prompt) => {
    const _ = {
        lines: [],
        line: null
    };
    const listen = (cb) => {
        _.line = createInterface({
            input: process.stdin,
            output: process.stdout,
            completer: l => [[l + ' '.repeat(tab)], l],
            removeHistoryDuplicates: true,
            historySize: history,
            prompt: prompt,
            tabSize: tab
        });
        _.line.once('close', () => process.exit());
        _.line.on('SIGINT', () => {
            if (_.lines.length) {
                _.lines.splice(0);
                console.log('\n');
                _.line.prompt();
                return;
            }
            console.log();
            _.line.close();
        });
        _.line.on('line', inp => {
            let back = inp.match(/\\*$/);
            let slash = back?.[0]?.length;
            if (slash) {
                let prompt = _.line.getPrompt();
                _.lines.push(inp.slice(0, -slash));
                for (let i = 1; i < slash; ++i) {
                    console.log(prompt);
                    _.lines.push('');
                }
                _.line.prompt();
                return;
            }
            _.line.pause();
            _.lines.push(inp);
            let lines = _.lines.splice(0);
            let input = lines.join('\n');
            cb(input);
        });
        _.line.prompt();
    };
    const line = () => _.line?.prompt();
    return {
        listen,
        line
    };
};
export default line;
