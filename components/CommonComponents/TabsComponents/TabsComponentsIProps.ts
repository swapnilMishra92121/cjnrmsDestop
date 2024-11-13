interface tabListObj {
    name: string;
    id?: number;
    disable?:boolean
}
export interface TabsComponentsIProps {
    activeTab: number;
    handleTabChange: (number: number) => void;
    tabList: tabListObj[]

}