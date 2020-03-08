import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentWrapper from "../../layout/ContentWrapper/ContentWrapper";
import DownloadsTable from "./components/DownloadsTable";
import SaveEvidenceModal from "../../common/SaveEvidenceModal/SaveEvidenceModal";
import { Statistic, Grid, Segment } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { storeDownloadsData } from "../../store/actions/appData";

function DownloadsContainer() {
  const dispatch = useDispatch();
  const downloadsData = useSelector(
    state => state.appDataReducer.downloadsData
  );
  const [downloads, setDownloads] = useState(downloadsData.downloads);
  const [downloadsMeta, setDownloadsMeta] = useState(downloadsData.meta);
  const [showModal, setShowModal] = useState({
    show: false,
    data: {}
  });

  function fetchData() {
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    !(downloadsData.meta || downloadsData.downloads) &&
      axios.get("/history/downloads", config).then(res => {
        setDownloads(res.data.data);
        setDownloadsMeta(res.data.meta);
        dispatch(
          storeDownloadsData({ downloads: res.data.data, meta: res.data.meta })
        );
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      <Grid columns="equal" stretched style={{ paddingBottom: "30px" }}>
        <Grid.Row>
          <Grid.Column width={8}>
            <Segment padded color="blue" textAlign="center">
              <Statistic size="small" color="blue">
                <Statistic.Label>Default download directory</Statistic.Label>
                <Statistic.Value>
                  {downloadsMeta?.mostFreqDownloadDir}
                </Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment padded color="blue" textAlign="center">
              <Statistic.Group>
                <Statistic color="blue">
                  <Statistic.Label>Most files downloaded</Statistic.Label>
                  <Statistic.Value>
                    {downloadsMeta?.byDate[0].date}
                  </Statistic.Value>
                </Statistic>
                <Statistic color="blue">
                  <Statistic.Label>Count</Statistic.Label>
                  <Statistic.Value>
                    {downloadsMeta?.byDate[0].visits}
                  </Statistic.Value>
                </Statistic>
              </Statistic.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment padded color="blue" textAlign="center">
              <Statistic color="blue">
                <Statistic.Label>Biggest file (MB)</Statistic.Label>
                <Statistic.Value>
                  {Math.round(downloadsMeta?.biggestFile.total_bytes / 1000000)}
                </Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <SaveEvidenceModal show={showModal.show} setShowModal={setShowModal} showModal={showModal}/>
      <DownloadsTable downloads={downloads} setShowModal={setShowModal} />
    </ContentWrapper>
  );
}

export default DownloadsContainer;
