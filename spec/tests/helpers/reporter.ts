import SuiteInfo = jasmine.SuiteInfo
const {SpecReporter, DisplayProcessor, StacktraceOption} = require('jasmine-spec-reporter');

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `TypeScript ${log}`
    }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
    new SpecReporter({
        spec: {
            displayStacktrace: StacktraceOption.NONE,
        },
        customProcessors: [CustomProcessor],
    })
)
