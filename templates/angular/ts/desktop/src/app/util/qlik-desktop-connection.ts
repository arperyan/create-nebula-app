export class QlikDesktopConnection {
    session: enigmaJS.ISession;
    global: EngineAPI.IGlobal;
    app: EngineAPI.IApp;

    private enigmaConfig: enigmaJS.IConfig;
    private enigma: IEnigmaClass;
    private schema: { [k: string]: any };

    constructor(enigma: IEnigmaClass, schema: any) {
        if (!enigma) throw new Error(`Qlik Desktop: "enigma" is required`);
        if (!schema) throw new Error(`Qlik Desktop: "schema" is required`);

        this.enigma = enigma;
        this.schema = schema;
    }

    async connect(): Promise<EngineAPI.IGlobal> {
        await this.prepare();
        this.session = this.enigma.create(this.enigmaConfig);
        this.global = await this.session.open();
        return this.global;
    }

    async connectAndOpenDoc(appId: string): Promise<EngineAPI.IApp> {
        if (!appId) throw new Error(`Qlik Desktop: "appId" is required`);
        await this.prepare(appId);
        this.session = this.enigma.create(this.enigmaConfig);
        this.global = await this.session.open();
        this.app = await this.global.openDoc(appId);
        return this.app;
    }

    private async prepare(appId?: string): Promise<void> {
        const docId = appId ? appId : "engineData";
        console.log(appId);
        this.enigmaConfig = {
            Promise: Promise,
            schema: this.schema,
            url: `ws://localhost:4848/app/${docId}`,
        };
    }
}
