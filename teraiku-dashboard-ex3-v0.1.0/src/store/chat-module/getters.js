export default {
    filteredTasks(state) {
        let data = state.tasks;

        // // タイトルの検索
        // if (state.filterQuery.title !== "") {
        //     data = data.filter(function (row) {
        //         return row['title'].indexOf(state.filterQuery.title) !== -1;
        //     });
        // }

        // // 状態の検索
        // if (state.filterQuery.state_id !== "") {
        //     data = data.filter(function (row) {
        //         return row['state_id'] === state.filterQuery.state_id;
        //     });
        // }

        // // 作成日で検索
        // if (state.filterQuery.created_at !== null) {
        //     const queryData = dayjs(state.filterQuery.created_at).format('YYYY-MM-DD');
        //     data = data.filter(function (row) {
        //         return queryData === dayjs(row.created_at).format('YYYY-MM-DD');
        //     });
        // }

        return data;
    }
}
