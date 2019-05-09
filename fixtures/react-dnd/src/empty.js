export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="3.4.0">
  <process id="Process_1" isExecutable="false">
    <sequenceFlow id="SequenceFlow_1" name="" sourceRef="StartEvent_1" targetRef="Task_1" />
    <sequenceFlow id="SequenceFlow_2" sourceRef="Task_1" targetRef="ExclusiveGateway_1" />
    <startEvent id="StartEvent_1" name="hunger noticed">
      <outgoing>SequenceFlow_1</outgoing>
    </startEvent>
    <task id="Task_1" name="choose recipe">
      <incoming>SequenceFlow_1</incoming>
      <outgoing>SequenceFlow_2</outgoing>
    </task>
    <exclusiveGateway id="ExclusiveGateway_1" name="desired dish?">
      <incoming>SequenceFlow_2</incoming>
    </exclusiveGateway>
  </process>
  <bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="SequenceFlow_1_gui" bpmnElement="SequenceFlow_1">
        <omgdi:waypoint x="210" y="121" />
        <omgdi:waypoint x="276" y="121" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="263" y="177" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_2_di" bpmnElement="SequenceFlow_2">
        <omgdi:waypoint x="376" y="121" />
        <omgdi:waypoint x="438" y="121" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="427" y="177" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_16g5oa3_di" bpmnElement="StartEvent_1">
        <omgdc:Bounds x="174" y="103" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="156" y="138" width="73" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0kmcz3u_di" bpmnElement="Task_1">
        <omgdc:Bounds x="276" y="81" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_04ookgz_di" bpmnElement="ExclusiveGateway_1" isMarkerVisible="true">
        <omgdc:Bounds x="438" y="96" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="431" y="144" width="65" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;
