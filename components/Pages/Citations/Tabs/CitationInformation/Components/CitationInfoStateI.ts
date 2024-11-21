export interface CitationInfoI {
    citationType: string | null,
    deliveryMethod: string | null,
    offenseDate: string | null,
    offenseTime: string | null,
    officer: string | null,
    badge: string | null,
    caseOrICRNumber: string | null,
    county: string | null,
    prosecutingCourt: string | null,
    prosecutingEntity: string | null,
    mandatoryCourt: boolean,
}