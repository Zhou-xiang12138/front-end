import http from "../http-common";
class RecommendService {
    medicine(data) {
        return http.post("/recommend/medicine", data);
    }

}
export default new RecommendService();
