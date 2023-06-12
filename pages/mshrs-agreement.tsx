import { NextPage } from 'next';
import styled from 'styled-components';
import { useAddress } from '@thirdweb-dev/react';
import { useState } from 'react';

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 16px;
  text-align: center;

  a {
    color: #ccc002;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const DefaultText = styled.p`
  color: #ccc002;
  font-size: 10px;
`;

const MshrsAgreement: NextPage = () => {
  const [showBasicExplanation, setShowBasicExplanation] = useState(false);
  const address = useAddress();

  const toggleExplanation = () => {
    setShowBasicExplanation(!showBasicExplanation);
  };

  return (
    <Container>
      <Main>
        <button onClick={toggleExplanation}>
          {showBasicExplanation ? 'See Legal Version' : 'See Simplified Version'}
        </button>

        {showBasicExplanation ? (
          <>
            <h2>This Music Share Token Contract - Explained!</h2>
            <p>
              This is like a special deal between the person who makes music (we call them &quot;the
              Artist&quot;) and someone who wants to help support the artist and their music (we call
              them &quot;the Buyer&quot;). This deal is all about a special kind of music token, like a
              special kind of ticket. These special tickets are called <b>Music Share Tokens</b>.
            </p>
            <p>
              The Artist has songs that they put on music apps like Spotify. When people listen to
              these songs on Spotify, the Artist gets some money - we&apos;re calling this{' '}
              <b>&ldquo;Streaming Royalties&rdquo;</b>.
            </p>
            <p>
              With this deal, the Artist is saying: &quot;I&apos;ll take a part of the money I make from
              people listening to my songs, and I&apos;ll share it with you if you buy these special
              Music Share Tokens from me.&quot;
            </p>
            <p>
              Each song gets 100,000 Music Share Tokens, and if you buy one, it&apos;s like owning a
              teeny tiny part of the money that song makes when people listen to it on Spotify. You
              can buy these Music Share Tokens from a special app at{' '}
              <a href="https://memakyou.com">memakyou.com</a>.
            </p>
            <p>
              Every few months (four times a year), the Artist will count the money that the song
              has made and share it with all the Music Share Token owners. They will tell you how
              much money you&apos;ve made from your Music Share Tokens and send it to you.
            </p>
            <p>
              How much you have to pay for one of these Music Share Tokens can change. The Artist
              decides the price and they will tell you the price when you want to buy it. If you buy
              a Music Share Token, you are also responsible for things like taxes.
            </p>
            <p>
              Once you buy a Music Share Token, it&apos;s yours. You can&apos;t return it or ask for a refund.
              But you can sell it to someone else if you want to!
            </p>
            <p>
              If there&apos;s a problem or a misunderstanding about this deal, the Artist&apos;s team at
              MEMAKYOU will help figure things out.
            </p>
            <p>
              Just remember, owning a Music Share Token doesn&apos;t mean you can use the song for things
              like making money or playing it on a TV show. That&apos;s not allowed. And if something
              goes wrong (like you lost money because you couldn&apos;t sell your Music Share Token), the
              Artist and MEMAKYOU aren&apos;t responsible for that.
            </p>
          </>
        ) : (
          <>
            <h2>
              This Music Share Token Contract (the &quot;Contract&quot;) is entered into by and between MEMAKYOU
              (the &quot;Artist&quot;) and the holder of the Music Share Token (the &quot;Buyer&quot;).
            </h2>
            <p>
              For the purposes of this Contract, &quot;Streaming Royalties&quot; are the money that the Artist
              earns when their songs are played on streaming services like Spotify. By buying the Music
              Share Tokens ($MSHRE), you are purchasing a piece of these Streaming Royalties. This means
              that you&apos;ll get a percentage of the money made from the song&apos;s streams, corresponding to
              the amount of $MSHRE tokens you own. Each $MSHRE token represents a tiny fraction
              (0.0002%) of the total streaming income for each song.
            </p>

            <h2>Metadata</h2>
            <p>The following metadata is associated with each unique Music Share Token being sold in this contract:</p>
            <ul>
              <li>Token Name: MUSIC SHARES</li>
              <li>Token Symbol: $MSHRS</li>
              <li>Total Supply: 100,000 (per song)</li>
              <li>Contract Address: [INSERT CONTRACT ADDRESS]</li>
              <li>Blockchain Network: Polygon</li>
              <li>Artist: MEMAKYOU</li>
              <li>Royalty Percentage: 20% per song (each token represents 0.0002% of the royalties)</li>
            </ul>
            <p>
              The following metadata will be provided upon the release of a new token ID and attached to the 1155 token for each unique Music Share Token being sold in this contract:
            </p>
            <ul>
              <li>Song Title: [SONG_NAME]</li>
              <li>Release Date:</li>
              <li>ISRC Code: [SONG_ISRC_CODE]</li>
              <li>Writer(s):</li>
              <li>Publisher:</li>
              <li>Label:</li>
              <li>Genre:</li>
              <li>Duration:</li>
            </ul>

            <h2>Sale of Streaming Royalties</h2>
            <p>
              For each song released by the Artist on Spotify, the Artist agrees to sell and transfer
              20% of the streaming royalties generated by the song through the sale of 100,000 $MSHRS
              Music Share Tokens, each token representing 0.0002% ownership in the streaming
              royalties. These royalties will be managed and sold on the MEMAKYOU.com decentralised
              application, with royalty payouts managed by MEMAKYOU four times annually.
            </p>

            <h2>Rights of the Buyer</h2>
            <p>
              Upon purchasing the Music Share Tokens, the Buyer will receive the right to receive a
              percentage of the streaming royalties generated by the selected song. The Buyer will
              be paid quarterly within 60 days after the end of each calendar quarter. MEMAKYOU
              shall provide the Buyer with a detailed royalty statement, reflecting the calculations
              of the royalties earned, within 60 days after the end of each calendar quarter.
            </p>

            <h2>Purchase Price and Royalty Distribution</h2>
            <p>
              The purchase price for each Music Share Token will be set and clearly outlined on
              each transaction and is subject to change without prior consent. Changes will be made
              and approved by MEMAKYOU. The royalties will be collected by MEMAKYOU four times
              annually and distributed to the Buyer in proportion to their ownership percentage
              represented by the Music Share Tokens. The Buyer acknowledges that they are
              responsible for any taxes or other fees related to the purchase or sale of the Music
              Share Tokens.
            </p>

            <h2>Terms of Sale</h2>
            <p>
              The sale is considered final upon minting of the Music Share Tokens, and no refunds
              will be issued. The Music Share Tokens can be resold on any marketplace desired by the
              owner, subject to any conditions or limitations specified in the Music Share Token
              Contract. The Artist may not repurchase the Music Share Tokens from the Buyer unless
              both parties agree in writing to a buyback agreement.
            </p>

            <h2>Responsibilities and Liabilities</h2>
            <p>
              Both the Buyer and the Artist agree to fulfill their respective obligations as set
              forth in the Music Share Token Contract. Any disputes related to this contract will be
              resolved directly by the MEMAKYOU team, through official communication channels such
              as Discord. The prevailing party in any arbitration or legal proceeding related to
              this contract will be entitled to recover its reasonable attorneys&apos; fees and costs.
            </p>

            <h2>Disclaimers and Limitations of Liability</h2>
            <p>
              The Buyer acknowledges that owning a Music Share Token grants them the right to use
              the underlying artwork for personal, non-commercial use only. Any commercial use of
              the underlying artwork without the express written consent of the Artist is strictly
              prohibited. The Artist and MEMAKYOU will not be liable for any damages or losses
              suffered by the Buyer as a result of the sale of the Music Share Tokens, including but
              not limited to lost profits or lost opportunities. The parties are not responsible for
              downtime or issues related to the Polygon network.
            </p>

            <h2>Governing Law</h2>
            <p>
              This Contract will be governed by and construed in accordance with the laws of the
              Republic of Ireland, without regard to its conflict of law provisions.
            </p>

            <h2>Termination and Modification</h2>
            <p>
              This Contract may be terminated by either party upon written notice to the other party
              if a force majeure event occurs. A force majeure event is defined as any event beyond
              the reasonable control of either party, including but not limited to acts of God, war,
              terrorism, civil unrest, or failure of communication systems.
            </p>

            <h2>Assignment</h2>
            <p>
              Neither party may assign its rights or obligations under this Contract without the
              prior written consent of the other party, except that the Artist may assign its rights
              and obligations to an affiliate or successor in interest without the consent of the
              Buyer, provided that such assignment does not materially affect the Buyer&apos;s rights or
              obligations under this Contract.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of this Contract is held to be invalid, illegal, or unenforceable by
              a court of competent jurisdiction, the remaining provisions of this Contract shall
              remain in full force and effect, and the invalid, illegal, or unenforceable provision
              shall be deemed modified to the minimum extent necessary to render it valid, legal,
              and enforceable.
            </p>

            <h2>Representations and Warranties</h2>
            <p>
              Both parties represent and warrant that they have the authority to enter into this
              Contract and that they will not breach any other agreements, covenants, or obligations
              in doing so. The Artist represents and warrants that they have the right to sell the
              mechanical royalties and that the Buyer will not be subject to any claims or
              encumbrances related to the mechanical royalties. Additionally, the Artist represents
              and warrants that they have the right to use any underlying artwork or other
              intellectual property associated with the Music Share Token.
            </p>

            <h2>Miscellaneous</h2>
            <p>
              This Contract constitutes the entire agreement between the parties concerning the
              subject matter hereof, and supersedes all prior and contemporaneous agreements,
              whether oral or written, between the parties relating thereto. No amendment,
              modification, or waiver of any provision of this Contract shall be effective unless in
              writing and signed by both parties. If any provision of this Contract is held to be
              invalid, illegal, or unenforceable, the remaining provisions shall remain in full
              force and effect.
            </p>

            <p>IN WITNESS WHEREOF, the parties have executed this Contract as of the date first above written.</p>

            <p>ARTIST:<br/> <DefaultText>MEMAKYOU</DefaultText></p>
            <p>BUYER: <br/><DefaultText>{address}</DefaultText></p>
          </>
        )}
      </Main>
    </Container>
  );
};

export default MshrsAgreement;
