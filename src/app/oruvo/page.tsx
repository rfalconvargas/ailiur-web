import {
  OruvoHero,
  BalanceSheet,
  Differentiation,
  AssetMap,
  FuturePlanner,
  SubscriptionTracker,
  TimeRoiCards,
  ScenarioPlanner,
  TrustStrip,
  WaitlistForm,
  OruvoFeedback,
  OruvoFooter,
} from '@/components/oruvo';

/** Oruvo by Ailiur — wealth-intelligence landing + waitlist MVP. */
export default function OruvoPage() {
  return (
    <>
      <OruvoHero />
      <BalanceSheet />
      <Differentiation />
      <AssetMap />
      <FuturePlanner />
      <SubscriptionTracker />
      <TimeRoiCards />
      <ScenarioPlanner />
      <TrustStrip />
      <WaitlistForm />
      <OruvoFeedback />
      <OruvoFooter />
    </>
  );
}
