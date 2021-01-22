public class fetchCaseNumber {
    @AuraEnabled(cacheable=true)
    public static string fetchId(string caseNum){
        List<Case> results = [ SELECT Id FROM Case WHERE CaseNumber =: caseNum LIMIT 1 ];

        return results.isEmpty() ? null : results[ 0 ].Id;
    }
}