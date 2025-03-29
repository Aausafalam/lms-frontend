class RoutesDetailsUtils {
    static mapSectionToDetails = (section, data, notIncludeKey = [], customMapper = (key, value) => value) => ({
        heading: section[0],
        body: section
            .filter((field) => field.type !== "rowHeader" && !notIncludeKey.includes(field.name))
            .reduce((acc, field) => {
                acc[field.label] = customMapper(field.name, data[field.name] ?? "N/A");
                return acc;
            }, {}),
        grid: 2,
    });
}
export default RoutesDetailsUtils;
